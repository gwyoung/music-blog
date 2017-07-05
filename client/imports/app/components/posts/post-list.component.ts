import { Component, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Counts } from 'meteor/tmeasday:publish-counts';
import * as _ from 'underscore';

import template from './post-list.component.html';
import style from './post-list.component.scss';
import { Posts } from '../../../../../both/collections/posts.collection';
import { Post } from '../../../../../both/models/post.model';
import { PaginationFilter } from '../../../../../both/filters/pagination.filter';
import { PostFilter } from '../../../../../both/filters/post.filter';

@Component({
    selector: 'post-list',
    template,
    styles: [ style ]
})
export class PostListComponent implements OnChanges, OnDestroy {
    posts: Observable<Post[]>;
    postsSub: Subscription;
    currentPage: BehaviorSubject<number>;
    paginationSub: Subscription;
    postsCount: number = 0;
    autorunSub: Subscription;
    loading: boolean = true;

    @Input() pageSize: number = 8;
    @Input() page: number = 1;
    @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

    @Input() excludedPostId?: string;
    @Input() artists?: string[];
    @Input() label?: string;
    @Input() year?: number;
    @Input() genre?: string;
    @Input() isList?: boolean;
    @Input() recommended?: boolean;
    @Input() headphones?: boolean;
    @Input() search?: string;

    ngOnChanges() {
        this.loading = true;
        this.page = this.page
            ? Math.max(1, this.page)
            : 1;
        this.currentPage = new BehaviorSubject<number>(this.page);

        if (this.paginationSub) {
            this.paginationSub.unsubscribe();
        }

        this.paginationSub = this.currentPage.subscribe((page: number) => {
            const sort: any = { date: -1 };
            const paginationFilter: PaginationFilter = {
                limit: this.pageSize,
                skip: (page - 1) * this.pageSize,
                sort: sort
            };

            if (this.postsSub) {
                this.postsSub.unsubscribe();
            }

            // Construct the post filter
            const postFilter: PostFilter = new PostFilter();
            if (this.excludedPostId) {
                postFilter.excludedPostId = this.excludedPostId;
            }
            if (this.artists && this.artists.length) {
                postFilter.artists = this.artists;
            }
            if (this.label) {
                postFilter.label = this.label;
            }
            if (this.year) {
                postFilter.year = this.year;
            }
            if (this.genre) {
                postFilter.genre = this.genre;
            }
            if (this.recommended) {
                postFilter.recommended = this.recommended;
            }
            if (this.headphones !== undefined) {
                postFilter.headphones = this.headphones;
            }
            if (this.isList !== undefined) {
                postFilter.isList = this.isList;
            }

            this.postsSub = MeteorObservable
                .subscribe('posts', paginationFilter, postFilter.toQuery(), this.search)
                .subscribe(() => {
                    this.posts = Posts.find(postFilter.toQuery(), {
                        sort: sort
                    }).zone();

                    this.loading = false;
                });
        });

        if (this.autorunSub) {
            this.autorunSub.unsubscribe();
        }

        this.autorunSub = MeteorObservable.autorun().subscribe(() => {
            this.postsCount = Counts.get('numberOfPosts');
        });
    }

    ngOnDestroy() {
        this.paginationSub.unsubscribe();
        this.postsSub.unsubscribe();
        this.autorunSub.unsubscribe();
    }

    incrementPage(diff: number) {
        let newPage: number = this.currentPage.value + diff;

        this.currentPage.next(newPage);
        this.pageChange.emit(newPage);
    }
}
