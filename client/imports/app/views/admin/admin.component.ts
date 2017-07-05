import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import template from './admin.component.html';
import { Post } from '../../../../../both/models/post.model';
import { Posts } from '../../../../../both/collections/posts.collection';
import { PostPermissions } from '../../../../../both/permissions/post.permissions';
import { PostHelpersService } from '../../services/post-helpers.service';

@Component({
    selector: 'admin',
    template
})
export class AdminComponent implements OnInit, OnDestroy {
    slug: string;
    post: Post;
    postSub: Subscription;
    paramsSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private postHelpersService: PostHelpersService
    ) {}

    ngOnInit() {
        this.paramsSub = this.route.params
            .map(params => params['slug'])
            .subscribe(slug => {
                this.slug = slug;

                if (this.postSub) {
                    this.postSub.unsubscribe();
                }

                this.postSub = MeteorObservable.subscribe('post', this.slug)
                    .subscribe(() => {
                        this.post = Posts.findOne({
                            slug: this.slug
                        });

                        this.post = this.post || {
                            date: new Date(),
                            albums: []
                        };
                })
            });
    }

    ngOnDestroy() {
        this.postSub.unsubscribe();
        this.paramsSub.unsubscribe();
    }

    canEdit() {
        return this.post && (this.post._id
            ? PostPermissions.update(Meteor.userId())
            : PostPermissions.insert(Meteor.userId()));
    }

    canRemove() {
        return this.post
            && this.post._id
            && PostPermissions.remove(Meteor.userId());
    }

    removePost() {
        if (this.post && this.post._id) {
            Posts.remove(this.post._id);
            this.router.navigate(['/admin']);
        }
    }

    publish() {
        if (this.canEdit()) {
            // Fill in the unique slug for the post
            this.post.slug = this.postHelpersService.getSlug(this.post);

            if (!this.post._id) {
                Posts.insert(this.post).subscribe((postId: string) => {
                    this.router.navigate(['/post/', postId]);
                });
            } else {
                let postId: string = this.post._id;
                delete this.post._id;

                Posts.update(postId, { $set: this.post });
                this.router.navigate(['/post/', this.post.slug]);
            }
        }
    }
}