export interface PostComment {
    // Collection id
    _id?: string;

    // Post link
    postId: string;

    // Comment date
    date: Date;

    // Comment name
    name: string;

    // Comment text
    text: string;
}