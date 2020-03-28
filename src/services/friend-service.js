import ServiceBase from './service-base';

import ldflex from "@solid/query-ldflex";

import { foaf } from 'rdf-namespaces';
import { fetchDocument } from 'tripledoc';

class FriendService extends ServiceBase {

    async findFriendsFor(webId) {
        const doc = await fetchDocument(webId);
        const me = doc.getSubject(webId);
        return me.getAllRefs(foaf.knows);
    }

    async findValidFriends(webId) {
        const friends = await this.findFriendsFor(webId);
        return (await Promise.all(friends.map(f => this.exists(f) ? f : null))).filter(x => x);
    }

    async exists(webId) {
        return await super.existsResource(webId);
    }

    async addFriend(webId, friendWebId) {
        await ldflex[webId].knows.add(ldflex[friendWebId]);
    }

    async deleteFriend(webId, friendWebId) {
        await ldflex[webId].knows.delete(ldflex[friendWebId]);
    }
}

const friendService = new FriendService();

export default friendService;