import ServiceBase from './service-base';
//import jsonld from 'jsonld';
import { routeContext } from './contexts';
import { AccessControlList } from '@inrupt/solid-react-components';
import { v4 as uuid } from 'uuid';

const PUBLIC_ROUTES_PATH = 'public/';
const PUBLISHED_ROUTES_PATH = PUBLIC_ROUTES_PATH + 'published.json';

class RouteService extends ServiceBase {

    transformRoute(route) {
        /*console.log(route)
        console.log(await jsonld.compact(route))
        return await jsonld.compact(route, routeContext);*/
        return { "@context": routeContext, ...route };
    }

    async saveRoute(webId, route) {
        return await super.tryOperation(async client => {
            //console.log(this.transformRoute(route))
            await client.createFile(
                await this.generateRouteURI(webId),
                JSON.stringify(this.transformRoute(route)),
                "application/ld+json"
            );
            return true;
        });
    }

    async canReadRouteDir(webId) {
        const client = await super.getFileClient();
        try {
            return await client.itemExists(await this.getPublishedRoutesPath(webId));
        } catch (error) {
            return false;
        }
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

    async findAllPublicRoutes(webId) {
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
        const target = rawTarget.replace(/(^\w+:|^)\/\//, '').replace(/\./g, '-').replace(/\//g, '');
        return `${await super.getRouteStorage(webId)}${PUBLIC_ROUTES_PATH}${target}`;
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

    /*async copyRouteIn(routeUri, targetPath) {
        var routePath = `${targetPath}${routeId}.jsonld`
        return await super.tryOperation(async client => {
            await client.copyFile(await this.getRouteURL(webId, routeId), routePath);
        });s
    }*/

    async publishRoute(webId, routeUri, to = null) {
        return await super.tryOperation(async client => {
            await this.updatePublished(webId, client, routes => routes.add(routeUri), to);

            const permissions = [{ agents: to ? [to] : null, modes: [AccessControlList.MODES.READ] }];
            const ACLFile = new AccessControlList(webId, routeUri);

            if (to) {
                await ACLFile.assignPermissions(permissions);
            } else {
                await ACLFile.createACL(permissions);
            }
        });
    }

    async depublishRoute(webId, routeUri, to = null) {
        return await super.tryOperation(async client => {
            await this.updatePublished(webId, client, routes => routes.delete(routeUri), to);

            const permissions = [{ agents: to ? [to] : null, modes: [AccessControlList.MODES.READ] }];
            const ACLFile = new AccessControlList(webId, routeUri);

            if (to)
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