import { Component, Input, OnChanges } from '@angular/core';

import template from './post-detail.component.html';
import style from './post-detail.component.scss';
import { Post } from '../../../../../both/models/post.model';
import { Album } from '../../../../../both/models/album.model';

@Component({
    selector: 'post-detail',
    template,
    styles: [ style ]
})
export class PostDetailComponent implements OnChanges {
    @Input() post?: Post;
    @Input() album?: Album;

    galleryIndex: number = 0;
    galleryVisible: boolean = false;

    ngOnChanges() {
        if (this.post && this.post.albums.length === 1) {
            this.album = this.post.albums[0];
        } else if (this.post && this.post.albums.length > 1) {
            this.album = undefined;
        }
    }

    openGallery(selectedAlbum: Album) {
        if (this.post && this.post.albums.length > 1) {
            this.galleryIndex = this.post.albums.indexOf(selectedAlbum);
            this.galleryVisible = true;
        }
    }
}