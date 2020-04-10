import ServiceBase from './service-base';
import { groupContext } from './contexts';

import { v4 as uuid } from 'uuid';

class GroupService extends ServiceBase {

    transformGroup(group) {
        return { "@context": groupContext, ...group };
    }

    async saveGroup(webId, group) {
        return await super.tryOperation(async client => {
            await client.createFile(
                await this.generateGroupURI(webId),
                JSON.stringify(this.transformGroup(group)),
                "application/ld+json"
            );
            return true;
        });
    }

    async findAllGroups(webId) {
        return await super.tryOperation(async client => {
            const groups = await client.readFolder(await super.getGroupStorage(webId));
            return (await Promise.all(groups.files.map(f => client.readFile(f.url))))
                .map((r, i) => this.parseGroup(groups.files[i].url, r)).filter(x => x);
        });
    }

    async readGroup(groupUri) {
        return await super.tryOperation(async client => {
            return this.parseGroup(groupUri, await client.readFile(groupUri));
        });
    }

    async deleteGroup(groupUri) {
        return await super.tryOperation(async client => await client.deleteFile(groupUri));
    }

    async existsGroup(groupUri) {
        return await super.existsResource(groupUri);
    }

    async generateGroupURI(webId) {
        const base = await super.getGroupStorage(webId);
        const id = uuid();
        return `${base}${id}.jsonld`;
    }

    parseGroup(groupUri, string) {
        try {
            const group = JSON.parse(string);
            group.id = groupUri;
            return group;
        } catch (err) {
            return null;
        }
    }
}

const groupService = new GroupService();

export default groupService;