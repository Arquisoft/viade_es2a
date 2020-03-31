import ServiceBase from './service-base';
import { v4 as uuid } from 'uuid';
import { commentContext } from './contexts';
import { AccessControlList } from '@inrupt/solid-react-components';

class CommentService extends ServiceBase {

    async transformMyRoutesComments(myRoutesComments) {
        return { "@context": commentContext, ...myRoutesComments };
    }

    async postComment(webId, comment, route) {
        return await super.tryOperation(async client => {
            const myCommentUri = await this.generateMyCommentURI(webId);

            await client.createFile(
                myCommentUri,
                JSON.stringify(comment),
                "application/json"
            );

            await client.createFile(
                route.comments,
                JSON.stringify({ "comments": [{ "@id": myCommentUri }] }),
                "application/ld+json",
                { merge: "keep_source" }
            );

            const permissions = [{ agents: null, modes: [AccessControlList.MODES.READ] }];
            await super.appendPermissions(client, webId, myCommentUri, permissions, true);

            return true;
        });
    }

    async getComments(route) {
        //const routesURIs = await this.getCommentsURIs(route);
    }

    async getCommentsURIs(route) {
        return await super.this.tryOperation(async client => {
            const commentsFile = await client.readFile(route.comments);
            return commentsFile.comments;
        });
    }

    async findAllComments(webId) {
        return await super.tryOperation(async client => {
            const comments = await client.readFolder(await super.getCommentStorage(webId));
            return (await Promise.all(comments.files.map(f => client.readFile(f.url))))
                .map((r, i) => this.parseComment(comments.files[i].url, r)).filter(x => x);
        });
    }

    async readComment(commentUri) {
        return await super.tryOperation(async client => {
            return this.parseMyComment(commentUri, await client.readFile(commentUri));
        });
    }

    async deleteComment(commentUri) {
        return await super.tryOperation(async client => await client.deleteFile(commentUri));
    }

    async existsComment(commentUri) {
        return await super.existsResource(commentUri);
    }

    async generateMyCommentURI(webId) {
        const base = await super.getMyCommentStorage(webId);
        const id = uuid();
        return `${base}${id}.json`;
    }

    async generateMyRoutesCommentURI(webId) {
        const base = await super.getMyRoutesCommentStorage(webId);
        const id = uuid();
        return `${base}${id}.jsonld`;
    }

    async createMyRouteCommentsFile(client, uri) {
        await client.createFile(
            uri,
            JSON.stringify(await this.transformMyRoutesComments({ "comments": [] })),
            "application/ld+json"
        );
    }

    parseMyComment(commentUri, string) {
        try {
            const comment = JSON.parse(string);
            comment.id = commentUri;
            return comment;
        } catch (err) {
            return null;
        }
    }
}

const commentService = new CommentService();

export default commentService;