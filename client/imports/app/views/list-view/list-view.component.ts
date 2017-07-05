import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import template from './list-view.component.html';
import style from './list-view.component.scss';

@Component({
    selector: 'list-view',
    template,
    styles: [ style ]
})
export class ListViewComponent {
    paramsSub: Subscription;

    title: string;
    subtitle?: string;

    artist?: string;
    label?: string;
    year?: number;
    genre?: string;
    recommended?: boolean;
    headphones?: boolean;
    isList?: boolean;
    search?: string;

    page?: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title
    ) {}

    ngOnInit() {
        this.paramsSub = this.route.params
            .subscribe(params => {
                if (params['artist']) {
                    this.artist = params['artist'];
                    this.title = params['artist'];
                } else if (params['label']) {
                    this.label = params['label'];
                    this.title = params['label'];
                } else if (params['year']) {
                    this.year = parseInt(params['year'], 10);
                    this.title = params['year'];
                } else if (params['genre']) {
                    this.genre = params['genre'];
                    this.title = params['genre'];
                } else if (this.router.url.indexOf('reviews') !== -1) {
                    this.isList = false;
                    this.title = 'Reviews';
                } else if (this.router.url.indexOf('lists') !== -1) {
                    this.isList = true;
                    this.title = 'Lists';
                } else if (this.router.url.indexOf('fantasy') !== -1) {
                    this.recommended = true;
                    this.title = 'Vinyl Fantasy';
                    this.subtitle = 'The record collection of your dreams.';
                } else if (this.router.url.indexOf('headphones') !== -1) {
                    this.headphones = true;
                    this.title = 'Use Headphones';
                    this.subtitle = 'Feed this candy directly to your ears.';
                } else if (this.router.url.indexOf('speakers') !== -1) {
                    this.headphones = false;
                    this.title = 'Use Speakers';
                    this.subtitle = 'Pump up the volume and let these fill the room.';
                } else if (params['search']) {
                    this.search = params['search'];
                    this.title = 'Search Results for "' + params['search'] + '"';
                }

                if (params['page']) {
                    this.page = params['page'];
                }

                // Set page title
                let pageTitle: string = 'Bricks Clapping In The Dark';
                if (this.title) {
                    pageTitle = this.title + ' | ' + pageTitle;
                }
                this.titleService.setTitle(pageTitle);
            });
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
    }

    pageChange(newPage: number) {
        let route: string = this.page
            ? '../'
            : './page';

        this.router.navigate([route, newPage], {
            relativeTo: this.route
        });
    }
}