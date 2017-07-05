import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { PostComment } from '../models/post-comment.model';
import { PostCommentPermissions } from '../permissions/post-comment.permissions';

export const PostComments = new MongoObservable.Collection<PostComment>('comments');

PostComments.allow(PostCommentPermissions);