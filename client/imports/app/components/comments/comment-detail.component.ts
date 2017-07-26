import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Meteor } from 'meteor/meteor';

import template from './comment-detail.component.html';
import style from './comment-detail.component.scss';
import { PostComment } from '../../../../../both/models/post-comment.model';
import { PostComments } from '../../../../../both/collections/post-comments.collection';
import { PostCommentPermissions } from '../../../../../both/permissions/post-comment.permissions';

@Component({
    selector: 'comment-detail',
    template,
    styles: [ style ]
})
export class CommentDetailComponent implements OnInit, OnChanges {
    @Input() postId: string;
    @Input() comment: PostComment;
    @Input() clearOnSubmit?: boolean;

    editing: boolean;

    ngOnInit() {
        if (!this.comment) {
            this.createComment();
        }
    }

    ngOnChanges() {
        this.editing = this.comment
            && ((!this.comment._id && PostCommentPermissions.insert(Meteor.userId(), this.comment))
                || (this.comment._id && PostCommentPermissions.update(Meteor.userId())));
    }

    canRemove() {
        return this.comment
            && this.comment._id
            && PostCommentPermissions.remove(Meteor.userId());
    }

    createComment() {
        this.comment = {
            postId: this.postId,
            date: new Date(),
            name: '',
            text: ''
        };

        this.ngOnChanges();
    }

    saveComment() {
        if (this.editing) {
            this.comment.name = this.comment.name.trim() || 'Anonymous';

            if (this.comment.text.trim()) {
                // Insert or update the comment
                if (!this.comment._id) {
                    PostComments.insert(this.comment);
                } else {
                    let commentId: string = this.comment._id;
                    delete this.comment._id;
                    PostComments.update(commentId, { $set: this.comment });
                }

                if (this.clearOnSubmit) {
                    this.createComment();
                }
            }
        }

        // Prevent default event
        return false;
    }

    removeComment() {
        if (this.canRemove()) {
            PostComments.remove(this.comment._id);
        }
    }
}