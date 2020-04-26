import ServiceBase from "./service-base";

import commentService from "./comment-service";
import multimediaService from "./multimedia-service";
import { routeContext } from "./contexts";
import { AccessControlList } from "@inrupt/solid-react-components";
import { v4 as uuid } from "uuid";
import { fetchDocument } from "tripledoc";

const PUBLIC_ROUTES_PATH = "public/";
const PUBLISHED_ROUTES_PATH = PUBLIC_ROUTES_PATH + "published.json";

class RouteService extends ServiceBase {
  async transformRoute(route) {
    return { "@context": routeContext, ...route };
  }

  async saveRoute(webId, route, edit) {
    return await super.tryOperation(async (client) => {
      const commentsURI = edit
        ? null
        : await commentService.generateCommentsURI(webId);

      route.comments = edit ? edit.comments : commentsURI;

      await client.createFile(
        edit ? edit.id : await this.generateRouteURI(webId),
        JSON.stringify(await this.transformRoute(route)),
        "application/ld+json"
      );

      if (!edit) {
        await commentService.createCommentsFile(commentsURI);

        const permissions = [
          {
            agents: null,
            modes: [
              AccessControlList.MODES.READ,
              AccessControlList.MODES.APPEND,
            ],
          },
        ];

        await super.appendPermissions(
          client,
          webId,
          commentsURI,
          permissions,
          true
        );
      }

      return true;
    });
  }

  async canReadRouteDir(webId) {
    return await super.canRead(await this.getPublishedRoutesPath(webId));
  }

  async hasShared(webId, target) {
    return await super.canRead(await this.getSharedRoutesPath(webId, target));
  }

  async createUserRouteFile(webId, target) {
    return await super.tryOperation(async (client) => {
      //TODO añadir contexto
      await client.createFile(
        await this.getSharedFileUrl(webId, target),
        JSON.stringify({ routes: [] }),
        "application/ld+json"
      );
      return true;
    });
  }

  async addRouteToUserFile(webId, route, target) {
    return await this.tryOperation(async (client) => {
      var filePath = await this.getSharedFileUrl(webId, target);
      if (!(await client.itemExists(filePath))) {
        await this.createUserRouteFile(webId, target);
      }
      var file = JSON.parse(await client.readFile(filePath));
      file.routes.push({ "@id": route });
      await client.createFile(
        filePath,
        JSON.stringify(file),
        "application/ld+json"
      );
    });
  }

  async updateSharedFolder(webId) {
    return await super.tryOperation(async (client) => {
      var inboxFiles = await client.readFolder(
        await super.getInboxStorage(webId)
      );
      var parsedNotifications = JSON.parse(
        await client.readFile(await super.getParsedNotificationStorage(webId))
      );
      inboxFiles.files.forEach(async (notification) => {
        var alreadyParsed = parsedNotifications.filter(
          (parsedNotification) => parsedNotification === notification.url
        );
        if (alreadyParsed.length === 0) {
          //Añadir la notificacion parseada a la file
          parsedNotifications.push(notification.url);
          await client.createFile(
            await super.getParsedNotificationStorage(webId),
            JSON.stringify(parsedNotifications),
            "application/json"
          );

          const doc = await fetchDocument(notification.url);
          const notificationFile = doc.getSubject(notification.url);

          var routeUrl = notificationFile.getAllRefs(
            "https://www.w3.org/ns/activitystreams#object"
          )[0];
          var user = notificationFile.getAllRefs(
            "https://www.w3.org/ns/activitystreams#actor"
          );
          await this.addRouteToUserFile(webId, routeUrl, user);
        }
      });
    });
  }

  async getSharedFileUrl(webId, target) {
    var parsedTarget = target
      .toString()
      .replace(/(^\w+:|^)\/\//, "")
      .replace(/\/.*$/, "")
      .replace(/\./g, "-")
      .replace(/\//g, "");
    return `${await super.getSharedStorage(webId)}${parsedTarget}.jsonld`;
  }

  async getRoutesOf(webId, target) {
    return await super.tryOperation(async (client) => {
      var routes = [];
      var sharedFileUrl = super.getSharedFileUrl(webId, target);
      if (await client.itemExists(sharedFileUrl)) {
        var sharedFile = JSON.parse(await client.readFile(sharedFileUrl));
        routes = sharedFile.routes;
      }
      return routes;
    });
  }

  async findAllRoutes(webId) {
    return await super.tryOperation(async (client) => {
      const routes = await client.readFolder(
        await super.getRouteStorage(webId)
      );
      return (
        await Promise.all(routes.files.map((f) => client.readFile(f.url)))
      )
        .map((r, i) => this.parseRoute(routes.files[i].url, r))
        .filter((x) => x);
    });
  }

  async getRoutesByOwner(targetIds, webId) {
    return await super.tryOperation(async (client) => {
      await this.updateSharedFolder(webId);
      return await Promise.all(
        targetIds.map(async (targetId) => {
          const sharedPath = await this.getSharedFileUrl(webId, targetId);
          const publicPath = await this.getPublishedRoutesPath(targetId);

          const lists = await Promise.all(
            [sharedPath, publicPath].map(async (uri) => {
              if (await super.canRead(uri))
                return JSON.parse(await client.readFile(uri));
              else return null;
            })
          );
          lists[0].routes = lists[0].routes.map((route) => route["@id"]);

          const rawRouteList = [
            ...new Set(
              lists
                .filter((x) => x)
                .map((list) => list.routes)
                .flat()
            ),
          ];
          const checked = (
            await Promise.all(
              rawRouteList.map(async (r) =>
                (await super.canRead(r)) ? r : null
              )
            )
          ).filter((x) => x);

          const routes = (
            await Promise.all(
              checked.map(async (routeUri) => {
                return this.parseRoute(
                  routeUri,
                  await client.readFile(routeUri)
                );
              })
            )
          ).filter((x) => x);

          return { targetId, routes };
        })
      );
    });
  }

  async readRoute(routeUri) {
    return await super.tryOperation(async (client) => {
      return this.parseRoute(routeUri, await client.readFile(routeUri));
    });
  }

  async getPublishedRoutesPath(webId) {
    return `${await super.getRouteStorage(webId)}${PUBLISHED_ROUTES_PATH}`;
  }

  async getSharedRoutesPath(webId, rawTarget) {
    const target = rawTarget
      .replace(/(^\w+:|^)\/\//, "")
      .replace(/\/.*$/, "")
      .replace(/\./g, "-")
      .replace(/\//g, "");
    return `${await super.getRouteStorage(
      webId
    )}${PUBLIC_ROUTES_PATH}${target}.json`;
  }

  async updatePublished(webId, client, operation, to) {
    if (webId === to) return false;

    const path = to
      ? await this.getSharedRoutesPath(webId, to)
      : await this.getPublishedRoutesPath(webId);

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
      const permissions = [
        { agents: to ? [to] : null, modes: [AccessControlList.MODES.READ] },
      ];
      await super.appendPermissions(client, webId, path, permissions, true);
    }

    return true;
  }

  async getShareTargets(webId, routeUri) {
    return await super.tryOperation(async (client) => {
      const permissions = await super.getPermissions(client, webId, routeUri);
      if (!permissions) return [];

      const viewers = permissions
        .filter((e) => e.modes.includes("Read"))
        .map((e) => e.agents)
        .flat()
        .filter((id) => id !== webId);

      return viewers;
    });
  }

  async publishRoute(webId, routeUri, toArray = [null]) {
    return await super.tryOperation(async (client) => {
      const routeFile = JSON.parse(await client.readFile(routeUri));
      const res = await Promise.all(toArray.map(async (to) => {
        if (
          await this.updatePublished(
            webId,
            client,
            (routes) => routes.add(routeUri),
            to
          )
        ) {
          const permissions = [
            { agents: to ? [to] : null, modes: [AccessControlList.MODES.READ] },
          ];
          const commentsPermissions = [
            {
              agents: to ? [to] : null,
              modes: [
                AccessControlList.MODES.READ,
                AccessControlList.MODES.WRITE,
              ],
            },
          ];
          await super.appendPermissions(
            client,
            webId,
            routeUri,
            permissions,
            !to
          );
          await super.appendPermissions(
            client,
            webId,
            routeFile.comments,
            commentsPermissions,
            !to
          );
        }

        return true;
      }));

      return res;
    });
  }

  async depublishRoute(webId, routeUri, toArray = [null]) {
    return await super.tryOperation(async (client) => {
      await toArray.forEach(async (to) => {
        if (
          await this.updatePublished(
            webId,
            client,
            (routes) => routes.delete(routeUri),
            to
          )
        ) {
          const permissions = [
            { agents: to ? [to] : null, modes: [AccessControlList.MODES.READ] },
          ];
          await super.removePermissions(
            client,
            webId,
            routeUri,
            permissions,
            !to
          );
        }
      });
    });
  }

  async deleteRoute(webId, routeUri) {
    await this.depublishRoute(webId, routeUri);
    return await super.tryOperation(async (client) => {
      var route = JSON.parse(await client.readFile(routeUri));
      await client.deleteFile(route.comments);
      await client.deleteFile(routeUri);
    });
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

      route.waypoints.forEach((w) => {
        w.lat = w.latitude;
        w.lng = w.longitude;

        delete w.latitude;
        delete w.longitude;
      });

      route.points.forEach((p) => {
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

  async addMultimedia(route, files, webId) {
    if (files && files.length > 0) {
      multimediaService.uploadMultimedia(files, webId);
      const mediaPath = await this.getMultimediaStorage(webId);
      files.forEach((file) => {
        route.media.push({ "@id": `${mediaPath}${file.name}` });
      });
    }
    return route;
  }
}

const routeService = new RouteService();

export default routeService;
