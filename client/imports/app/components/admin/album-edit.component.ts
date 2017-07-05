import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

declare var Slingshot: any;

import template from './album-edit.component.html';
import style from './album-edit.component.scss';
import { Album } from '../../../../../both/models/album.model';

@Component({
    selector: 'album-edit',
    template,
    styles: [ style ]
})
export class AlbumEditComponent {
    @Input() album: Album;
    @Output() albumChange: EventEmitter<Album> = new EventEmitter<Album>();

    newArtist: string = '';
    newGenre: string = '';
    newSimilarArtist: string = '';

    constructor(
        private changeDetector: ChangeDetectorRef
    ) {}

    private addElement(element: string, array: string[]) {
        if (element) {
            array.push(element);
        }
    }

    private removeElement(element: string, array: string[]) {
        let index: number = array.indexOf(element);
        if (index >= 0) {
            array.splice(index, 1);
        }
    }

    addArtist() {
        this.addElement(this.newArtist, this.album.artists);
        this.newArtist = '';
    }

    removeArtist(artist: string) {
        this.removeElement(artist, this.album.artists);
    }

    addGenre() {
        this.addElement(this.newGenre, this.album.genres);
        this.newGenre = '';
    }

    removeGenre(genre: string) {
        this.removeElement(genre, this.album.genres);
    }

    addSimilarArtist() {
        this.addElement(this.newSimilarArtist, this.album.similarArtists);
        this.newSimilarArtist = '';
    }

    removeSimilarArtist(artist: string) {
        this.removeElement(artist, this.album.similarArtists);
    }

    fileChange(event: any) {
        if (event.target.files && event.target.files[0]) {
            let uploader: any = new Slingshot.Upload("imageUploads");
            uploader.send(event.target.files[0], (error: any, downloadUrl: string) => {
                if (error) {
                    console.error("Error uploading", uploader.xhr.response);
                } else {
                    this.album.imageUrl = downloadUrl;
                    this.changeDetector.detectChanges();
                }
            });
        }
    }
}