// Album review
export interface Album {
    // Release information
    title: string;
    artists: string[];
    year: number;
    label?: string;
    genres: string[];

    // Url to cover image (hosted on cloud services)
    imageUrl: string;

    // Review content
    review: string;
    similarArtists: string[];
    recommended: boolean;
    headphones: boolean;

    // Optional link to full post for this album review
    fullPostSlug?: string;
}