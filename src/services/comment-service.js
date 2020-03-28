import ServiceBase from './service-base';
import { v4 as uuid } from 'uuid';

class CommentService extends ServiceBase {

   

    async saveComment(webId, comment) {
        return await super.tryOperation(async client => {
            await client.createFile(
                await this.generateCommentURI(webId),
                JSON.stringify(comment),
                "application/json"
            );
            return true;
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
            return this.parseComment(commentUri, await client.readFile(commentUri));
        });
    }

    async deleteComment(commentUri) {
        return await super.tryOperation(async client => await client.deleteFile(commentUri));
    }

    async existsComment(commentUri) {
        return await super.existsResource(commentUri);
    }

    async generateCommentURI(webId) {
        const base = await super.getCommentStorage(webId);
        const id = uuid();
        return `${base}${id}.json`;
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