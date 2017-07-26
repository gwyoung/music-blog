import { Pipe, PipeTransform } from '@angular/core';
import { Album } from '../../../../both/models/album.model';

@Pipe({
    name: 'albumTitle'
})
export class AlbumTitlePipe implements PipeTransform {
    transform(album: Album): string {
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
}