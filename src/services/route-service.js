import ServiceBase from './service-base';
//import jsonld from 'jsonld';
import { routeContext } from './contexts';
import { v4 as uuid } from 'uuid';

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

    async findAllRoutes(webId) {
        return await super.tryOperation(async client => {
            const routes = await client.readFolder(await super.getPrivateRouteStorage(webId));
            return (await Promise.all(routes.files.map(f => client.readFile(f.url))))
                .map((r, i) => this.parseRoute(routes.files[i].url, r)).filter(x => x);
        });
    }

    async findAllPublicRoutes(webId) {
        return await super.tryOperation(async client => {
            const routes = await client.readFolder(await super.getPublicRouteStorage(webId));
            return (await Promise.all(routes.files.map(f => client.readFile(f.url))))
                .map((r, i) => this.parseRoute(routes.files[i].url, r)).filter(x => x);
        });
    }

    async readRoute(routeUri) {
        return await super.tryOperation(async client => {
            return this.parseRoute(routeUri, await client.readFile(routeUri));
        });
    }

    /*async copyRouteIn(routeUri, targetPath) {
        var routePath = `${targetPath}${routeId}.jsonld`
        return await super.tryOperation(async client => {
            await client.copyFile(await this.getRouteURL(webId, routeId), routePath);
        });
    }*/

    async publishRoute(routeUri) {
        //return await this.copyRouteIn(webId, routeId, await super.getPublicRouteStorage(webId))
    }

    async deleteRoute(routeUri) {
        return await super.tryOperation(async client => await client.deleteFile(routeUri));
    }

    async existsRoute(routeUri) {
        return await super.existsResource(routeUri);
    }

    async generateRouteURI(webId) {
        const base = await super.getPrivateRouteStorage(webId);
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