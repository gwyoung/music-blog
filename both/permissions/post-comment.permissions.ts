import { Roles } from 'meteor/alanning:roles';

import { PostComment } from '../models/post-comment.model';

export const PostCommentPermissions = {
    // Anonymous users can add comments but only if they
    // meet certain size limits
    insert: function (userId: string, postComment?: PostComment) {
        return !postComment 
            || (postComment.name.length <= 50
                && postComment.text.length <= 10000);
    },
    // Only admins can update or remove comments
    update: function (userId: string) {
        return Roles.userIsInRole(userId, ['admin']);
    },
    remove: function (userId: string) {
        return Roles.userIsInRole(userId, ['admin']);
    }
};