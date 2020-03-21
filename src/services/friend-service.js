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

    async addFriend(webId, friendWebId) {
        await ldflex[webId].knows.add(ldflex[friendWebId]);
    }
}

const friendService = new FriendService();

export default friendService;