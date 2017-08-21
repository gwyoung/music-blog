import { Pipe, PipeTransform } from '@angular/core';
import { Album, getAlbumTitle } from '../../../../both/models/album.model';

@Pipe({
    name: 'albumTitle'
})
export class AlbumTitlePipe implements PipeTransform {
    transform(album: Album): string {
        return getAlbumTitle(album);
    }
}