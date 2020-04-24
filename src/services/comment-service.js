import ServiceBase from './service-base';
import { v4 as uuid } from 'uuid';
import { commentContext } from './contexts';
import { AccessControlList } from '@inrupt/solid-react-components';

class CommentService extends ServiceBase {

    async transformComments(comments) {
        return { "@context": commentContext, ...comments };
    }

    async postComment(webId, comment, route){
        return await super.tryOperation(async client =>{

            var commentsFile = JSON.parse(await client.readFile(route.comments));
            commentsFile.comments.push(comment);
            await client.createFile(
                            route.comments,
                            JSON.stringify(commentsFile),
                            "application/ld+json"
                        );
        })
    }


    // async postComment(webId, comment, route) {
    //     return await super.tryOperation(async client => {
    //         const myCommentUri = await this.generateCommentURI(webId);

    //         await client.createFile(
    //             myCommentUri,
    //             JSON.stringify(comment),
    //             "application/json"
    //         );
    //             console.log("--PRUEBAS--")
    //             const uris = JSON.parse(await client.readFile(route.comments));
    //             console.log("uris")
    //             console.log(uris);
    //             const addedUri =uris.comments.concat([{ "@id": myCommentUri }]);
    //             console.log("added uri")
    //             console.log(addedUri)
    //             uris.comments = addedUri;
    //         await client.createFile(
    //             route.comments,
    //             JSON.stringify(uris),
    //             "application/ld+json",
    //             { merge: "keep_source" }
    //         );

    //         const permissions = [{ agents: null, modes: [AccessControlList.MODES.READ] }];
    //         await super.appendPermissions(client, webId, myCommentUri, permissions, true);

    //         return true;
    //     });
    // }

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

    async generateCommentsURI(webId) {
        const base = await super.getCommentStorage(webId);
        const id = uuid();
        return `${base}${id}.json`;
    }

    async createCommentsFile(commentsURI){
        return this.tryOperation(async client =>{
            var comments={"comments":[]}
            await client.createFile(
                commentsURI,
                JSON.stringify(this.transformComments(comments)),
                "application/ld+json"
            );
        })
    }


    parseComment(commentUri, string) {
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