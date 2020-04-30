import ServiceBase from './service-base';
import data from '@solid/query-ldflex';

const defaultProfilePhoto = 'img/icon/empty-profile.svg';

class UserService extends ServiceBase {

    async getUserName(webId) {
        const user = data[webId];
        const nameLd = await user.vcard_fn;
        var regex1 = /^https:\/\//gi;
        var regex2 = /\/profile\/card#me$/gi;
        const name = nameLd && nameLd.value.trim().length > 0 ? nameLd.value : webId.toString().replace(regex1, "").replace(regex2, "");
        return name;
    }

    async getProfile(webId) {
        const user = data[webId];
        const nameLd = await user.vcard_fn;

        const name = nameLd && nameLd.value.trim().length > 0 ? nameLd.value : webId.toString();
        const imageLd = await user.vcard_hasPhoto;

        let hasImage;
        let image;
        if (imageLd && imageLd.value) {
            image = imageLd.value;
            hasImage = true;
        } else {
            hasImage = false;
            image = defaultProfilePhoto;
        }

        return { name, image, hasImage, webId };
    }
}

const userService = new UserService();

export default userService;