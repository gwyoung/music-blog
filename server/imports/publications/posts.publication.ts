import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Posts } from '../../../both/collections/posts.collection';
import { PaginationFilter } from '../../../both/filters/pagination.filter';

Meteor.publish('posts', function(pagination: PaginationFilter, query?: Object, search?: string) {
    query = query || {};

    if (search) {
        let regex = new RegExp(search, 'i');
        let searchYear = parseInt(search, 10);

        query = {
            $and: [ query, {
                $or: [
                    { title: regex },
                    { 
                        albums: {
                            $elemMatch: { title: regex }
                        }
                    },
                    { 
                        albums: {
                            $elemMatch: { artists: regex }
                        }
                    },
                    { 
                        albums: {
                            $elemMatch: { label: regex }
                        }
                    },
                    {
                        albums: {
                            $not: { 
                                $elemMatch: { year: { $ne: searchYear } } 
                            }
                        }
                    },
                    { 
                        albums: {
                            $elemMatch: { genres: regex }
                        }
                    },
                    { 
                        albums: {
                            $elemMatch: { similarArtists: regex }
                        }
                    }
                ]
            }]
        };
    }

    Counts.publish(
        this,
        'numberOfPosts',
        Posts.collection.find(query),
        { noReady: true });

    return Posts.find(query, pagination);
});

Meteor.publish('post', function(slug: string) {
    return Posts.find({ slug: slug });
});

Meteor.publish('previousPost', function(date: Date) {
    return Posts.find(
        { date: { $lt: date } },
        { sort: { date: -1}, limit: 1 });
});

Meteor.publish('nextPost', function(date: Date) {
    return Posts.find(
        { date: { $gt: date } },
        { sort: { date: 1}, limit: 1 });
});