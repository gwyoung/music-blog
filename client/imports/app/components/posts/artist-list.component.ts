import { Component, Input } from '@angular/core';

import template from './artist-list.component.html';

@Component({
    selector: 'artist-list',
    template
})
export class ArtistListComponent {
    @Input() artists: string[];
    @Input() active?: boolean;
}