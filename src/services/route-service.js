import ServiceBase from './service-base';
//import jsonld from 'jsonld';
import { routeContext } from './contexts';
import { AccessControlList } from '@inrupt/solid-react-components';
import { v4 as uuid } from 'uuid';

const PUBLISHED_ROUTES_PATH = 'public/published.json';

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
            const routes = [...new Set(published.published)];

            return (await Promise.all(routes.map(r => client.readFile(r))))
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

    async updatePublished(webId, client, operation) {
        const publishedPath = await this.getPublishedRoutesPath(webId);

        let published = new Set();

        const exists = await client.itemExists(publishedPath);
        if (exists)
            published = new Set(JSON.parse(await client.readFile(publishedPath)).published);

        operation(published);

        await client.createFile(
            publishedPath,
            JSON.stringify({ published: [...published] }),
            "application/json"
        );

        if (!exists) {
            const permissions = [{ agents: null, modes: [AccessControlList.MODES.READ] }];
            await new AccessControlList(webId, publishedPath).createACL(permissions);
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
            await this.updatePublished(webId, client, published => published.add(routeUri));

            const permissions = [{ agents: to, modes: [AccessControlList.MODES.READ] }];
            const ACLFile = new AccessControlList(webId, routeUri);

            if (to)
                await ACLFile.assignPermissions(permissions);
            else
                await ACLFile.createACL(permissions);
        });
    }

    async depublishRoute(webId, routeUri, to = null) {
        return await super.tryOperation(async client => {
            await this.updatePublished(webId, client, published => published.delete(routeUri));

            const permissions = [{ agents: to, modes: [AccessControlList.MODES.READ] }];
            const ACLFile = new AccessControlList(webId, routeUri);

            if (to)
                await ACLFile.removePermissions(permissions);
            else
                await ACLFile.deleteACL(permissions);
        });
    }

    async deleteRoute(routeUri) {
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
            return route;
        } catch (err) {
            return null;
        }
    }
}

const routeService = new RouteService();

export default routeService;