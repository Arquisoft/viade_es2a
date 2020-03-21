import ServiceBase from './service-base';

class RouteService extends ServiceBase {

    async saveRoute(webId, route) {
        return await super.tryOperation(async client => {
            await client.createFile(
                await this.getRouteURL(webId, route.id),
                JSON.stringify(route),
                "application/ld+json"
            );
            return true;
        });
    }

    async findAllRoutes(webId) {
        return await super.tryOperation(async client => {
            return (await Promise.all((await client.readFolder(await super.getPrivateRouteStorage(webId)))
                .files.map(f => client.readFile(f.url)))).map(r => this.parseRoute(r)).filter(x => x);
        });
    }

    async findAllPublicRoutes(webId) {
        return await super.tryOperation(async client => {
            return (await Promise.all((await client.readFolder(await super.getPublicRouteStorage(webId)))
                .files.map(f => client.readFile(f.url)))).map(r => this.parseRoute(r)).filter(x => x);
        });
    }

    async readRoute(webId, routeId) {
        return await super.tryOperation(async client => {
            return this.parseRoute(await client.readFile(await this.getRouteURL(webId, routeId)));
        });
    }

    async copyRouteIn(webId, routeId, targetPath) {
        var routePath = `${targetPath}${routeId}.jsonld`
        return await super.tryOperation(async client => {
            await client.copyFile(await this.getRouteURL(webId, routeId), routePath);
        });
    }

    async publishRoute(webId, routeId) {
        return await this.copyRouteIn(webId, routeId, await super.getPublicRouteStorage(webId))
    }

    async readRouteURL(routeUrl) {
        return await super.tryOperation(async client => this.parseRoute(await client.readFile(routeUrl)));
    }

    async deleteRoute(webId, routeId) {
        return await super.tryOperation(async client => await client.deleteFile(await this.getRouteURL(webId, routeId)));
    }

    async existsRoute(webId, routeId) {
        return await super.tryOperation(async client => await client.itemExists(await this.getRouteURL(webId, routeId)));
    }

    async getRouteURL(webId, routeId) {
        const routesUrl = await super.getPrivateRouteStorage(webId);
        return `${routesUrl}${routeId}.jsonld`;
    }

    parseRoute(string) {
        try {
            return JSON.parse(string);
        } catch (err) {
            return null;
        }
    }
}

const routeService = new RouteService();

export default routeService;