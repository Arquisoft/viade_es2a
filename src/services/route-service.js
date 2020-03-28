import ServiceBase from './service-base';
//import jsonld from 'jsonld';
import { routeContext } from './contexts';
import { AccessControlList } from '@inrupt/solid-react-components';
import { v4 as uuid } from 'uuid';

const PUBLIC_ROUTES_PATH = 'public/';
const PUBLISHED_ROUTES_PATH = PUBLIC_ROUTES_PATH + 'published.json';

class RouteService extends ServiceBase {

    async transformRoute(route) {
        return { "@context": routeContext, ...route };
    }

    async saveRoute(webId, route) {
        //console.log(await jsonld.compact(route, routeContext))
        return await super.tryOperation(async client => {
            await client.createFile(
                await this.generateRouteURI(webId),
                JSON.stringify(await this.transformRoute(route)),
                "application/ld+json"
            );
            return true;
        });
    }

    async canReadRouteDir(webId) {
        return await super.canRead(await this.getPublishedRoutesPath(webId));
    }

    async hasShared(webId, target) {
        return await super.canRead(await this.getSharedRoutesPath(webId, target));
    }

    async hasShared(webId, target) {
        const client = await super.getFileClient();
        try {
            return await client.itemExists(await this.getSharedRoutesPath(webId, target));
        } catch (error) {
            return false;
        }
    }

    async findAllRoutes(webId) {
        return await super.tryOperation(async client => {
            const routes = await client.readFolder(await super.getRouteStorage(webId));
            return (await Promise.all(routes.files.map(f => client.readFile(f.url))))
                .map((r, i) => this.parseRoute(routes.files[i].url, r)).filter(x => x);
        });
    }

    /*async findAllPublicRoutes(webId) {
        return await super.tryOperation(async client => {
            const published = JSON.parse(await client.readFile(await this.getPublishedRoutesPath(webId)));
            const routes = [...new Set(published.routes)];


            return (await Promise.all(routes.map(r => client.itemExists(r) ? client.readFile(r) : null)))
                .map((r, i) => this.parseRoute(routes[i], r)).filter(x => x);
        });
    }

    async findSharedRoutes(webId, target) {
        return await super.tryOperation(async client => {
            const shared = JSON.parse(await client.readFile(await this.getSharedRoutesPath(webId, target)));
            const routes = [...new Set(shared.routes)];

            return (await Promise.all(routes.map(r => client.itemExists(r) ? client.readFile(r) : null)))
                .map((r, i) => this.parseRoute(routes[i], r)).filter(x => x);
        });
    }*/

    async getTimelineRoutes(targetIds, webId) {
        return await super.tryOperation(async client => {
            const rawRouteList = await Promise.all(targetIds.map(async targetId => {
                const sharedPath = await this.getSharedRoutesPath(targetId, webId);
                const publicPath = await this.getPublishedRoutesPath(targetId);

                const lists = await Promise.all([sharedPath, publicPath].map(async uri => {
                    if (await super.canRead(uri))
                        return JSON.parse(await client.readFile(uri));
                    else
                        return null;
                }));

                return lists.filter(x => x).map(list => list.routes).flat();
            }));

            const routeList = [...new Set(rawRouteList.flat())];

            const checked = (await Promise.all(routeList.map(async r => await super.canRead(r) ? r : null))).filter(x => x);

            return (await Promise.all(checked.map(async routeUri => {
                return this.parseRoute(routeUri, await client.readFile(routeUri));
            }))).filter(x => x);
        });
    }

    async readRoute(routeUri) {
        return await super.tryOperation(async client => {
            return this.parseRoute(routeUri, await client.readFile(routeUri));
        });
    }

    async getPublishedRoutesPath(webId) {
        return `${await super.getRouteStorage(webId)}${PUBLISHED_ROUTES_PATH}`;
    }

    async getSharedRoutesPath(webId, rawTarget) {
        const target = rawTarget.replace(/(^\w+:|^)\/\//, '').replace(/\/.*$/, '').replace(/\./g, '-').replace(/\//g, '');
        return `${await super.getRouteStorage(webId)}${PUBLIC_ROUTES_PATH}${target}.json`;
    }

    async hasACL(client, uri) {
        return await client.itemExists(`${uri}.acl`);
    }

    async updatePublished(webId, client, operation, to) {
        const path = to ?
            await this.getSharedRoutesPath(webId, to) :
            await this.getPublishedRoutesPath(webId);

        let routes = new Set();

        const exists = await client.itemExists(path);
        if (exists)
            routes = new Set(JSON.parse(await client.readFile(path)).routes);

        operation(routes);

        await client.createFile(
            path,
            JSON.stringify({ routes: [...routes] }),
            "application/json"
        );

        if (!exists) {
            const permissions = [{ agents: to ? [to] : null, modes: [AccessControlList.MODES.READ] }];
            await new AccessControlList(webId, path).createACL(permissions);
        }
    }

    async publishRoute(webId, routeUri, to = null) {
        if (webId === to)
            return;
        return await super.tryOperation(async client => {
            await this.updatePublished(webId, client, routes => routes.add(routeUri), to);

            const permissions = [{ agents: to ? [to] : null, modes: [AccessControlList.MODES.READ] }];
            const ACLFile = new AccessControlList(webId, routeUri);


            if (to && await this.hasACL(client, routeUri)) {
                await ACLFile.assignPermissions(permissions);
            } else
                await ACLFile.createACL(permissions);
            }
        )
    }

    async depublishRoute(webId, routeUri, to = null) {
        if (webId === to)
            return;
        return await super.tryOperation(async client => {
            await this.updatePublished(webId, client, routes => routes.delete(routeUri), to);

            const permissions = [{ agents: to ? [to] : null, modes: [AccessControlList.MODES.READ] }];
            const ACLFile = new AccessControlList(webId, routeUri);

            if (to && await this.hasACL(client, routeUri))
                await ACLFile.removePermissions(permissions);
            else
                await ACLFile.deleteACL(permissions);
        });
    }

    async deleteRoute(webId, routeUri) {
        await this.depublishRoute(webId, routeUri);
        return await super.tryOperation(async client => await client.deleteFile(routeUri));
    }

    async existsRoute(routeUri) {
        return await super.existsResource(routeUri);
    }

    async generateRouteURI(webId) {
        const base = await super.getRouteStorage(webId);
        const id = uuid();
        return `${base}${id}.jsonld`;
    }

    parseRoute(routeUri, string) {
        try {
            const route = JSON.parse(string);
            route.id = routeUri;

            route.waypoints.forEach(w => {
                w.lat = w.latitude;
                w.lng = w.longitude;

                delete w.latitude;
                delete w.longitude;
            });

            route.points.forEach(p => {
                p.lat = p.latitude;
                p.lng = p.longitude;

                delete p.latitude;
                delete p.longitude;
            });

            return route;
        } catch (err) {
            return null;
        }
    }
}

const routeService = new RouteService();

export default routeService;