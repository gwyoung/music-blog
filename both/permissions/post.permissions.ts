import { Roles } from 'meteor/alanning:roles';

export const PostPermissions = {
    insert: function (userId: string) {
        return Roles.userIsInRole(userId, ['admin']);
    },
    update: function (userId: string) {
        return Roles.userIsInRole(userId, ['admin']);
    },
    remove: function (userId: string) {
        return Roles.userIsInRole(userId, ['admin']);
    }
};