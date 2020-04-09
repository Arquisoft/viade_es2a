import ServiceBase from "./service-base";

class MultimediaService extends ServiceBase {
  async uploadMultimedia(files, webId) {
    return await super.tryOperation(async (client) => {
      const mediaPath = await this.getMultimediaStorage(webId);
      files.forEach((file) => {
        const filePath = `${mediaPath}${file.name}`;
        client.putFile(filePath, file, file.type);
      });
    });
  }

  async loadMultimedia(route){
    return await super.tryOperation(async (client) => {
        console.log("media");
        const mediaFiles = [];
        route.media.forEach((file)=>{
            console.log(file);
            console.log(file["@id"]);
        });

      }); 
  }



}

const multimediaService = new MultimediaService();

export default multimediaService;
