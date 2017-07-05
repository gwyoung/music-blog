import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Post } from '../models/post.model';
import { PostPermissions } from '../permissions/post.permissions';

export const Posts = new MongoObservable.Collection<Post>('posts');

Posts.allow(PostPermissions);