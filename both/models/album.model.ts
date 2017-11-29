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

    // Optional embed ids
    bandcampAlbumId?: string;
    bandcampTrackId?: string;
    youtubeId?: string;

    // Optional link to full post for this album review
    fullPostSlug?: string;
}

export function getAlbumTitle(album: Album): string {
    let artists: string = '';
    let title: string = '';

    if (album) {
        if (album.artists.length > 4) {
            artists = 'Various Artists';
        } else if (album.artists.length === 1) {
            artists = album.artists[0];
        } else {
            artists = album.artists.slice(0, album.artists.length - 1).join(', ')
                + ' & ' + album.artists[album.artists.length - 1];
        }

        title = artists + ' - ' + album.title;
    }

    return title;
}