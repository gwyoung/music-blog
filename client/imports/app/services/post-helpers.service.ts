import { Injectable } from '@angular/core';
import { Slug } from 'ng2-slugify';

import { Post } from '../../../../both/models/post.model';
import { Album } from '../../../../both/models/album.model';
import { AlbumTitlePipe } from '../pipes/album-title.pipe';

@Injectable()
export class PostHelpersService {
    private slug: Slug = new Slug();

    constructor(
        private albumTitlePipe: AlbumTitlePipe
    ) {}

    getTitle(post: Post): string {
        return post.albums.length === 1
            ? this.albumTitlePipe.transform(post.albums[0])
            : post.title;
    }

    getSlug(post: Post): string {
        let title: string = post.albums.length === 1
            ? this.albumTitlePipe.transform(post.albums[0])
            : post.title;

        return this.slug.slugify(title);
    }
}