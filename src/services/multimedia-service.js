import ServiceBase from "./service-base";

import { AccessControlList } from "@inrupt/solid-react-components";

class MultimediaService extends ServiceBase {
  async uploadMultimedia(files, webId) {
    return await super.tryOperation(async (client) => {
      const mediaPath = await super.getMultimediaStorage(webId);

      const permissions = [
        {
          agents: null,
          modes: [AccessControlList.MODES.READ],
        },
      ];

      files.forEach(async (file) => {
        const filePath = `${mediaPath}${file.name}`;
        await client.putFile(filePath, file, file.type);

        await super.appendPermissions(
          client,
          webId,
          filePath,
          permissions,
          true
        );
      });
    });
  }

  async deleteMultimedia(media) {
    return await super.tryOperation(async (client) => {
      client.deleteFile(media["@id"]);
    });
  }
}

const multimediaService = new MultimediaService();

export default multimediaService;
