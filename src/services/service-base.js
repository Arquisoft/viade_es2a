import data from '@solid/query-ldflex';
import { AccessControlList } from '@inrupt/solid-react-components';
import { errorToaster, permissionHelper } from '@utils';

import auth from 'solid-auth-client';
import FileClient from 'solid-file-client';

const appPublicPath = process.env.REACT_APP_ROUTES_PUBLIC_PATH;
const appPrivatePath = process.env.REACT_APP_ROUTES_PRIVATE_PATH;

export default class ServiceBase {

    buildPathFromWebId(webId, path) {
        if (!webId) return false;
        const domain = new URL(typeof webId === 'object' ? webId.webId : webId).origin;
        return `${domain}/${path}`;
    }

    async getStorage(webId, path) {
        const podStoragePath = await data[webId].storage;
        let podStoragePathValue =
            podStoragePath && podStoragePath.value.trim().length > 0 ? podStoragePath.value : '';

        if (podStoragePathValue && !podStoragePathValue.endsWith('/'))
            podStoragePathValue = `${podStoragePathValue}/`;

        if (!podStoragePathValue || podStoragePathValue.trim().length === 0)
            return this.buildPathFromWebId(webId, path);

        return `${podStoragePathValue}${path}`;
    }

    async getPrivateRouteStorage(webId) { return await this.getStorage(webId, appPrivatePath); }

    async getPublicRouteStorage(webId) { return await this.getStorage(webId, appPublicPath); }

    async createInitialFiles(webId) {
        return await this.tryOperation(async client => {
            const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
                webId,
                AccessControlList.MODES.WRITE
            );

            if (!hasWritePermission) return;

            const privateRoutesUrl = await this.getPrivateRouteStorage(webId);
            const publicRoutesUrl = await this.getPublicRouteStorage(webId);

            const privateRoutesFolderExists = await client.itemExists(privateRoutesUrl);
            const publicRoutesFolderExists = await client.itemExists(publicRoutesUrl);

            if (!privateRoutesFolderExists)
                await client.createFolder(privateRoutesUrl);

            if (!publicRoutesFolderExists)
                await client.createFolder(publicRoutesUrl);

            return true;
        });
    }

    async existsResource(path) {
        return await this.tryOperation(async client => await client.itemExists(path));
    }

    async tryOperation(operation) {
        try {
            return await operation(await this.getFileClient());
        } catch (error) {
            errorToaster(error.message, 'Error');
            console.log(error);
            return false;
        }
    }

    async getFileClient() {
        const fileClient = new FileClient(auth);
        let session = await auth.currentSession()
        if (!session)
            session = await auth.login()

        return fileClient;
    }
}