import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IMyDpOptions, IMyDateModel, IMyDate } from 'mydatepicker';

import template from './post-edit.component.html';
import style from './post-edit.component.scss';
import { Album } from '../../../../../both/models/album.model';
import { Post } from '../../../../../both/models/post.model';

@Component({
    selector: 'post-edit',
    template,
    styles: [ style ]
})
export class PostEditComponent implements OnInit {
    @Input() post: Post;
    @Output() postChange: EventEmitter<Post> = new EventEmitter<Post>();

    datePickerOptions: IMyDpOptions = {};
    selectedDate: IMyDate;

    ngOnInit() {
        this.selectedDate = {
            year: this.post.date.getFullYear(),
            month: this.post.date.getMonth() + 1,
            day: this.post.date.getDate()
        }
    }

    // When the datepicker value changes, update both selectedDate
    // and the post's date field
    dateChanged(event: IMyDateModel) {
        this.selectedDate = event.date;
        this.post.date = event.jsdate;
    }

    addAlbum() {
        let album: Album = {
            title: '',
            artists: [],
            year: 0,
            genres: [],
            imageUrl: '',
            review: '',
            similarArtists: [],
            recommended: false,
            headphones: false
        };

        // Insert the new album at the beginning of the list
        this.post.albums.splice(0, 0, album);
    }

    // Moves an album up or down in the list
    moveAlbum(album: Album, diff: number) {
        // Find the current index
        let index: number = this.post.albums.indexOf(album);
        if (index >= 0) {
            // Calculate the new index
            let newIndex: number = Math.max(
                Math.min(0, index + diff),
                this.post.albums.length - 1);

            // Remove the element from the index and re-add it at the newIndex
            this.post.albums.splice(newIndex, 0, this.post.albums.splice(index, 1)[0]);
        }
    }

    removeAlbum(album: Album) {
        let index: number = this.post.albums.indexOf(album);
        if (index >= 0) {
            this.post.albums.splice(index, 1);
        }
    }
}