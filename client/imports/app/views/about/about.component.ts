import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import template from './about.component.html';
import style from './about.component.scss';

@Component({
    selector: 'about',
    template,
    styles: [ style ]
})
export class AboutComponent {
    year: number = new Date().getFullYear();
    
    constructor(
        private titleService: Title
    ) {
        titleService.setTitle('About | Bricks Clapping In The Dark');
    }
}