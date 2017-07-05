import { Roles } from 'meteor/alanning:roles';

export const PostCommentPermissions = {
    // Anonymous users can add comments
    insert: function (userId: string) {
        return true;
    },
    // Only admins can update or remove comments
    update: function (userId: string) {
        return Roles.userIsInRole(userId, ['admin']);
    },
    remove: function (userId: string) {
        return Roles.userIsInRole(userId, ['admin']);
    }
};