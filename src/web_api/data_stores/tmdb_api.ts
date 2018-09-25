import * as _ from 'lodash';
import * as MovieDb from 'moviedb-promise';
import { ConfigDataStore } from '../data_stores/config_data_store';
import { TmdbMovie } from '../entities/tmdb_movie';
import { cinfo } from 'simple-color-print';

export class TmdbApi {
    private _movieDb: MovieDb.default | null;
    private _configDataStore: ConfigDataStore;

    constructor(configDataStore: ConfigDataStore) {
        this._configDataStore = configDataStore;        
        this._movieDb = null;
    }

    async findMultiple(imdbIds: Array<string>): Promise<Array<TmdbMovie | null>> {
        return await Promise.all(
            _.map(imdbIds, async (imdbId: string): Promise<TmdbMovie | null> => {
                cinfo(`Finding ${imdbId}`);
                return await this.find(imdbId);            
            })
        );        
    }

    async find(imdbId: string): Promise<TmdbMovie | null> {
        try {
            let movieDb = await this.getMovieDb();
            let data = await movieDb.find({ id: imdbId, external_source: 'imdb_id' });
            let movieResult = _.first(data.movie_results);
            if (_.isUndefined(movieResult)) return null;
            return new TmdbMovie(movieResult);
        }
        catch (err) {
            console.log('Error: ', err);     
            return null;
        }
    }

    private async getMovieDb(): Promise<MovieDb.default> {
        if (_.isNull(this._movieDb)) {
            let tmdbConfig = await this._configDataStore.getTmdbConfig();
            this._movieDb = new MovieDb.default(tmdbConfig.apiKey);
        }
        return this._movieDb;
    }
}