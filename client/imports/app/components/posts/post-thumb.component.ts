import { Component, Input, OnChanges } from '@angular/core';

import template from './post-thumb.component.html';
import style from './post-thumb.component.scss';
import { Post } from '../../../../../both/models/post.model';
import { Album } from '../../../../../both/models/album.model';

@Component({
    selector: 'post-thumb',
    template,
    styles: [ style ]
})
export class PostThumbComponent implements OnChanges {
    @Input() post?: Post;
    @Input() album?: Album;

    ngOnChanges() {
        if (this.post && this.post.albums.length === 1) {
            this.album = this.post.albums[0];
        } else if (this.post && this.post.albums.length > 1) {
            this.album = undefined;
        }
    }
}