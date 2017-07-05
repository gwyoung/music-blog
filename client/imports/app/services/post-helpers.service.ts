import { Injectable } from '@angular/core';
import { Slug } from 'ng2-slugify';

import { Post } from '../../../../both/models/post.model';
import { Album } from '../../../../both/models/album.model';

@Injectable()
export class PostHelpersService {
    private slug: Slug = new Slug();

    getTitle(post: Post): string {
        return post.albums.length === 1
            ? post.albums[0].artists.length === 1
                ? post.albums[0].artists[0] + ' - ' + post.albums[0].title
                : post.albums[0].title
            : post.title;
    }

    getSlug(post: Post): string {
        let title: string = post.albums.length === 1
            ? post.albums[0].artists.length === 1
                ? post.albums[0].artists[0] + ' ' + post.albums[0].title
                : post.albums[0].title
            : post.title;

        return this.slug.slugify(title);
    }
}