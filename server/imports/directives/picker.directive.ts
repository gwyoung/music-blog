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

        // Prepend post-specific opengraph meta tags
        let metas: string = '';
        metas += '<meta property="og:title" content="' + title + '" />';
        metas += '<meta property="og:type" content="article" />';
        metas += '<meta property="og:image" content="' + post.albums[0].imageUrl + '" />';

        request.dynamicHead = request.dynamicHead || '';
        request.dynamicHead = metas + request.dynamicHead;
    }

    next();
});

Picker.route('/(.*)', function (params, request, response, next) {
    // Generic opengraph meta tags
    let metas: string = '';
    metas += '<meta property="og:title" content="Bricks Clapping In The Dark" />';
    metas += '<meta property="og:description" content="Music recommendations for whoever\'s listening." />';
    metas += '<meta property="og:type" content="website" />';
    metas += '<meta property="og:image" content="https://music-blog.s3-us-west-2.amazonaws.com/logo.jpg" />';

    request.dynamicHead = request.dynamicHead || '';
    request.dynamicHead = request.dynamicHead + metas;

    next();
});