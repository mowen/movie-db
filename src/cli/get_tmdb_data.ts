import _ from 'lodash';
import firebase from 'firebase/app';
import { cerr, cinfo } from 'simple-color-print';
import { MovieHeader } from '../web_api/entities/movie_header';
import { ConfigDataStore } from '../web_api/data_stores/config_data_store';
import { MovieListing } from '../web_api/data_stores/movie_listing';
import { TmdbApi } from '../web_api/data_stores/tmdb_api';
import { MovieDataStore } from '../web_api/data_stores/movie_data_store';
import { TmdbMovie } from '../web_api/entities/tmdb_movie';

class GetTmdbData {
    private _movieListing: MovieListing;
    private _movieDataStore: MovieDataStore;
    private _tmdbApi: TmdbApi;

    constructor(configDataStore: ConfigDataStore) {
        this._movieListing = new MovieListing(configDataStore);
        this._movieDataStore = new MovieDataStore();
        this._tmdbApi = new TmdbApi(configDataStore);
    }

    async execute(): Promise<Array<MovieHeader | null>> {
        let result: Array<MovieHeader | null> = [];

        try {
            let movies = await this._movieListing.getAll();
            
            if (movies != null) {
                cinfo(`movies.length: ${movies.length}`);
                result = await Promise.all(_.map(movies, 
                    async (movieHeader: MovieHeader): Promise<MovieHeader | null> => {
                        let movieDetail = await this.getTmdbMovie(movieHeader);
                        if (movieDetail == null) return null;
                        await this.setMovieData(movieHeader, movieDetail);
                        return movieHeader;
                    }));
            }
            else {
                cinfo(`movies.length: 0`);
            } 
        }
        catch(err) {
            cerr(err);
        }

        return result;
    }

    private async getTmdbMovie(movieHeader: MovieHeader): Promise<TmdbMovie | null> {
        let tmdbMovie: TmdbMovie | null = null;

        try {
            tmdbMovie = await this._tmdbApi.find(movieHeader.imdbId);
        }
        catch(err) {
            cerr(err);
        }

        return tmdbMovie;
    }

    private async setMovieData(movieHeader: MovieHeader, movieDetail: TmdbMovie): Promise<void> {
        try {
            await this._movieDataStore.setMovie(movieHeader, movieDetail);
        }
        catch(err) {
            cerr(err);
        }
    }
}

async function getTmdbData(): Promise<void> {
    let configDataStore = new ConfigDataStore();
    let getTmdbData = new GetTmdbData(configDataStore);
    await getTmdbData.execute();
}

async function getDataStoreData(imdbId: string): Promise<any> {
    let movieDataStore = new MovieDataStore();
    return await movieDataStore.getMovie(imdbId);
}

(async () => {
    let configDataStore = new ConfigDataStore();
    let firebaseConfig = await configDataStore.getFirebaseConfig();
    firebase.initializeApp(firebaseConfig.config);

    await getTmdbData();

    let batmanBegins = await getDataStoreData('tt0372784');
    console.log(batmanBegins);

    process.exit();
})();
