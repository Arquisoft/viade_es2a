import ServiceBase from './service-base';
import { v4 as uuid } from 'uuid';
import { commentContext } from './contexts';

class CommentService extends ServiceBase {

    transformComments(comments) {
        return { "@context": commentContext, ...comments };
    }

    async postComment(comment, route) {
        return await super.tryOperation(async client => {

            var commentsFile = JSON.parse(await client.readFile(route.comments));
            commentsFile.comments.push(comment);
            await client.createFile(
                route.comments,
                JSON.stringify(commentsFile),
                "application/ld+json"
            );
        })
    }


    async getComments(route) {
        return await super.tryOperation(async client => {
            var comments = JSON.parse(await client.readFile(route.comments));
            return comments.comments;
        });
    }

    async getCommentsURIs(route) {
        return await super.this.tryOperation(async client => {
            const commentsFile = await client.readFile(route.comments);
            return commentsFile.comments;
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

    async generateCommentsURI(webId) {
        const base = await super.getCommentStorage(webId);
        const id = uuid();
        return `${base}${id}.jsonld`;
    }

    async createCommentsFile(commentsURI) {
        return this.tryOperation(async client => {
            var comments = { "comments": [] }
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