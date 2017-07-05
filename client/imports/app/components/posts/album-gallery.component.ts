import { Component, Input, Output, EventEmitter, Renderer, OnChanges, OnDestroy } from '@angular/core';

import template from './album-gallery.component.html';
import style from './album-gallery.component.scss';
import { Album } from '../../../../../both/models/album.model';

@Component({
    selector: 'album-gallery',
    template,
    styles: [ style ]
})
export class AlbumGalleryComponent implements OnChanges, OnDestroy {
    @Input() albums: Album[];
    @Input() index: number = 0;
    @Output() indexChange: EventEmitter<number> = new EventEmitter<number>();
    @Input() visible: boolean = false;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private renderer: Renderer
    ) {}

    ngOnChanges() {
        // While the gallery is open, prevent scrolling on the body behind it
        this.renderer.setElementClass(document.body, 'no-scroll', this.visible);
    }

    ngOnDestroy() {
        // When the component is destroyed, revert changes to the document body
        this.renderer.setElementClass(document.body, 'no-scroll', false);
    }

    incrementIndex(diff: number) {
        this.index += diff;
        this.indexChange.emit(this.index);
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }
}