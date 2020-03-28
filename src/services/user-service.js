import ServiceBase from './service-base';
import data from '@solid/query-ldflex';

class UserService extends ServiceBase {

   

async getUserName(webId){

    const user = data[webId];
    const nameLd = await user.vcard_fn;
    var regex1 = /^https:\/\//gi;
    var regex2 = /\/profile\/card#me$/gi;
    const name = nameLd && nameLd.value.trim().length > 0 ? nameLd.value : webId.toString().replace(regex1,"").replace(regex2,"");
    return name;

}






}

const userService = new UserService();

export default userService;