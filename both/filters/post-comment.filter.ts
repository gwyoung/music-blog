export class PostCommentFilter {
    postId?: string;

    toQuery(): Object {
        let query: Object = {};

        if (this.postId) {
            query = {
                $and: [ query, { postId: this.postId } ]
            };
        }

        return query;
    }
}