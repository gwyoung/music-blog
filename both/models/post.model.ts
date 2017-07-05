import { Album } from './album.model';

export interface Post {
    // Collection id
    _id?: string;

    // Unique url slug for this post
    slug?: string;

    // Date of post
    date: Date;

    // One or more album reviews included with this post
    albums: Album[];

    // Title defaults to title of first album if not specified
    title?: string;

    // Optional blurb for the full post
    blurb?: string;
}