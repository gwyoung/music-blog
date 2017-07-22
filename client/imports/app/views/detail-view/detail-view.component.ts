import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import * as _ from 'underscore';

import 'rxjs/add/operator/map';

import template from './detail-view.component.html';
import style from './detail-view.component.scss';
import { Album } from '../../../../../both/models/album.model';
import { Post } from '../../../../../both/models/post.model';
import { PostComment } from '../../../../../both/models/post-comment.model';
import { PostCommentFilter } from '../../../../../both/filters/post-comment.filter';
import { Posts } from '../../../../../both/collections/posts.collection';
import { PostComments } from '../../../../../both/collections/post-comments.collection';
import { PostPermissions } from '../../../../../both/permissions/post.permissions';
import { PostCommentPermissions } from '../../../../../both/permissions/post-comment.permissions';
import { PostHelpersService } from '../../services/post-helpers.service';

@Component({
    selector: 'detail-view',
    template,
    styles: [ style ]
})
export class DetailViewComponent implements OnInit, OnDestroy {
    slug: string;
    post: Post;
    postSub: Subscription;
    nextPost: Post;
    nextPostSub: Subscription;
    previousPost: Post;
    previousPostSub: Subscription;
    commentsSub: Subscription;
    comments: Observable<PostComment[]>;
    paramsSub: Subscription;
    artists: string[];
    excludedPostIds: string[];
    notFound: boolean;

    constructor(
        private route: ActivatedRoute,
        private titleService: Title,
        private postHelpersService: PostHelpersService
    ) {}

    private setExcludedPostIds() {
        this.excludedPostIds = [];

        if (this.post) {
            this.excludedPostIds.push(this.post._id);
        }

        if (this.previousPost) {
            this.excludedPostIds.push(this.previousPost._id);
        }

        if (this.nextPost) {
            this.excludedPostIds.push(this.nextPost._id);
        }
    }

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['slug'])
            .subscribe(slug => {
                this.slug = slug;

                this.postSub && this.postSub.unsubscribe();

                this.postSub = MeteorObservable.subscribe('post', this.slug)
                    .subscribe(() => {
                        this.post = Posts.findOne({ slug: this.slug });

                        this.notFound = !this.post;

                        if (this.post) {
                            this.nextPostSub && this.nextPostSub.unsubscribe();
                            this.nextPostSub = MeteorObservable
                                .subscribe('nextPost', this.post.date)
                                .subscribe(() => {
                                    this.nextPost = Posts.findOne(
                                        { date: { $gt: this.post.date } },
                                        { sort: { date: 1} });
                                    this.setExcludedPostIds();
                                });

                            this.previousPostSub && this.previousPostSub.unsubscribe();
                            this.previousPostSub = MeteorObservable
                                .subscribe('previousPost', this.post.date)
                                .subscribe(() => {
                                    this.previousPost = Posts.findOne(
                                        { date: { $lt: this.post.date } },
                                        { sort: { date: -1} });
                                    this.setExcludedPostIds();
                                });

                            let postCommentFilter = new PostCommentFilter();
                            postCommentFilter.postId = this.post._id;
                            this.commentsSub = MeteorObservable
                                .subscribe('comments', postCommentFilter.toQuery())
                                .subscribe(() => {
                                    this.comments = PostComments.find(
                                        postCommentFilter.toQuery(), 
                                        { sort: { date: 1 } }).zone();
                                });

                            this.artists = this.post.albums.length === 1
                                ? this.post.albums[0].artists
                                    .concat(this.post.albums[0].similarArtists)
                                : _.flatten(
                                    _.map(this.post.albums, (album: Album) => {
                                        return album.artists;
                                    }));

                            // Set page title
                            this.titleService.setTitle(
                                this.postHelpersService.getTitle(this.post)
                                + ' | Bricks Clapping In The Dark');

                            this.setExcludedPostIds();
                        }
                });
            });
    }

    ngOnDestroy() {
        this.postSub && this.postSub.unsubscribe();
        this.nextPostSub && this.nextPostSub.unsubscribe();
        this.previousPostSub && this.previousPostSub.unsubscribe();
        this.commentsSub && this.commentsSub.unsubscribe();
        this.paramsSub && this.paramsSub.unsubscribe();
    }

    canEdit() {
        return this.post && PostPermissions.update(Meteor.userId());
    }

    canAddComment() {
        return this.post && PostCommentPermissions.insert(Meteor.userId());
    }
}