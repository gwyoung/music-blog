import { Component, Input } from '@angular/core';

import template from './artist-link.component.html';

@Component({
    selector: 'artist-link',
    template
})
export class ArtistLinkComponent {
    @Input() artist: string;
    @Input() active?: boolean;
}