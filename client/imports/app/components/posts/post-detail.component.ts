import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

    bandcampEmbedUrl: SafeResourceUrl;
    youtubeEmbedUrl: SafeResourceUrl;

    galleryIndex: number = 0;
    galleryVisible: boolean = false;

    constructor(private sanitizer: DomSanitizer) {}

    ngOnChanges() {
        if (this.post && this.post.albums.length === 1) {
            this.album = this.post.albums[0];
        } else if (this.post && this.post.albums.length > 1) {
            this.album = undefined;
        }

        this.bandcampEmbedUrl = undefined;
        this.youtubeEmbedUrl = undefined;

        if (this.album) {
            // Construct embed urls with any specified ids and sanitize them
            if (this.album.bandcampAlbumId || this.album.bandcampTrackId) {
                this.bandcampEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                    'https://bandcamp.com/EmbeddedPlayer' +
                    '/size=large/bgcol=333333/linkcol=4ec5ec/tracklist=false/artwork=none/transparent=true/' +
                    (this.album.bandcampAlbumId ? 'album=' + this.album.bandcampAlbumId : '') + '/' +
                    (this.album.bandcampTrackId ? 'track=' + this.album.bandcampTrackId : '') + '/');
            }
            
            if (this.album.youtubeId) {
                this.youtubeEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
                    'https://www.youtube.com/embed/' + this.album.youtubeId);
            }
        }
    }

    openGallery(selectedAlbum: Album) {
        if (this.post && this.post.albums.length > 1) {
            this.galleryIndex = this.post.albums.indexOf(selectedAlbum);
            this.galleryVisible = true;
        }
    }
}