import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

import './imports/publications/posts.publication';
import './imports/publications/post-comments.publication';
import './imports/directives/upload.directive';
import './imports/directives/picker.directive';

Meteor.startup(() => {
    // Ensure that the admin user exists and has the correct permissions
    if (!Accounts.findUserByEmail(Meteor.settings['AdminEmail'])) {
        let adminUserId = Accounts.createUser({
            email: Meteor.settings['AdminEmail'],
            password: Meteor.settings['AdminPassword']
        });

        Roles.addUsersToRoles(adminUserId, 'admin', Roles.GLOBAL_GROUP);
    }
});