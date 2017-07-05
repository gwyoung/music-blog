import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import template from './app.component.html';
import style from './app.component.scss';
 
@Component({
    selector: 'app',
    template,
    styles: [ style ]
})
export class AppComponent implements OnInit {
    query: string;

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                window.scrollTo(0, 0);
            }
        });
    }

    search() {
        if (this.query && this.query.trim()) {
            this.router.navigate(['/search', this.query.trim()]);
            this.query = '';
        }
    }
}