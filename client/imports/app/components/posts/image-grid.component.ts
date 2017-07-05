import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import template from './image-grid.component.html';
import style from './image-grid.component.scss';
import { Album } from '../../../../../both/models/album.model';

@Component({
    selector: 'image-grid',
    template,
    styles: [ style ]
})
export class ImageGridComponent implements OnChanges {
    rowSize: number;

    @Input() albums: Album[];
    @Output() albumSelected: EventEmitter<Album> = new EventEmitter<Album>();

    ngOnChanges() {
        this.rowSize = 1;
        
        // Find the upper row size limit for a perfect square
        while (this.albums.length > Math.pow(this.rowSize, 2)) {
            this.rowSize++;
        }

        // If the album count is closer to the square of the lower row size bound,
        // choose it instead
        if (Math.abs(this.albums.length - Math.pow(this.rowSize - 1, 2))
            < Math.abs(this.albums.length - Math.pow(this.rowSize, 2))) {
            this.rowSize--;
        }
    }

    getClasses(index: number): string[] {
        let classes: string[] = ['grid-image'];

        if (index === 0) {
            classes.push('top-left');
        }

        if (index === this.rowSize - 1) {
            classes.push('top-right');
        }

        return classes;
    }

    selectAlbum(selectedAlbum: Album) {
        this.albumSelected.emit(selectedAlbum);
    }
}