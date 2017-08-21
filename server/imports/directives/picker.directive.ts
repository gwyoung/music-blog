import { Meteor } from 'meteor/meteor';
import { Picker } from 'meteor/meteorhacks:picker';

import { Post } from '../../../both/models/post.model';
import { Album, getAlbumTitle } from '../../../both/models/album.model';
import { Posts } from '../../../both/collections/posts.collection';

Picker.route('/post/:slug', function (params, request, response, next) {
    let post: Post = Posts.findOne({ slug: params.slug });

    if (post) {
        let title = (post.albums.length === 1
            ? getAlbumTitle(post.albums[0])
            : post.title) + ' | Bricks Clapping In The Dark';

        // Append post-specific opengraph meta tags
        request.dynamicHead = request.dynamicHead || '';
        request.dynamicHead += '<meta property="og:title" content="' + title + '">';
        request.dynamicHead += '<meta property="og:type" content="article">';
        request.dynamicHead += '<meta property="og:image" content="'
            + post.albums[0].imageUrl + '">';
    }

    next();
});