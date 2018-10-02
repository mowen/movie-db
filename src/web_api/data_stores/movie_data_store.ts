import _ from 'lodash';
import firebase from 'firebase';
import { MovieHeader } from '../entities/movie_header';
import { TmdbMovie } from '../entities/tmdb_movie';

export class MovieDataStore {
    async setMovie(header: MovieHeader, detail: TmdbMovie) : Promise<void> {
        let ref = firebase.database().ref(`/movies/${header.imdbId}`);
        await ref.set({
            ourTitle: header.title,
            format: header.format,
            tmdbTitle: detail.title,
            releaseDate: detail.releaseDate,
            overview: detail.overview,
            posterUrl: detail.posterUrl,
            backdropUrl: detail.backdropUrl
        });
    }

    async getMovie(imdbId: string): Promise<any> {
        let ref = firebase.database().ref(`/movies/${imdbId}`);
        let movieData = await ref.once('value');
        return movieData.val();
    }
}