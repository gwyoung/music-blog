import { Meteor } from 'meteor/meteor';

import { PostComments } from '../../../both/collections/post-comments.collection';

Meteor.publish('comments', function(query?: Object) {
    return PostComments.find(query || {});
});