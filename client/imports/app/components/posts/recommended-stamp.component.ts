import { Component, Input } from '@angular/core';

import template from './recommended-stamp.component.html';
import style from './recommended-stamp.component.scss';

@Component({
    selector: 'recommended-stamp',
    template,
    styles: [ style ]
})
export class RecommendedStampComponent {
    @Input() thumbSize?: boolean;
    @Input() clickable?: boolean;
}