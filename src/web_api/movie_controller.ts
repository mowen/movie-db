import * as _ from 'lodash';
import { Request, Response } from 'express'
import { Controller, Get } from '@overnightjs/core'
import { cinfo, cerr } from 'simple-color-print';

import { MovieHeader } from './entities/movie_header';
import { ConfigDataStore } from './data_stores/config_data_store';
import { MovieListing } from './data_stores/movie_listing';
import { TmdbApi } from './data_stores/tmdb_api';

@Controller('api/movies')
export class MovieController
{
    private _movieListing: MovieListing;
    private _tmdbApi: TmdbApi;

    constructor(configDataStore: ConfigDataStore) {
        this._movieListing = new MovieListing(configDataStore);
        this._tmdbApi = new TmdbApi(configDataStore);
    }

    @Get('')
    async getAll(req: Request, res: Response): Promise<void> {
        let data;

        try {
            let movies = await this._movieListing.getAll();
            if (movies != null) {
                cinfo(`movies.length: ${movies.length}`);
                data = _.map(movies, (mh: MovieHeader): any => mh.toData());
            }
            else {
                cinfo(`movies.length: 0`);
            } 
        }
        catch(err) {
            cerr(err);
            data = err;
        }
        finally {
            res.status(200).json({ movies: data });
        }
    }

    @Get(':imdbId')
    async get(req: Request, res: Response): Promise<void> {
        let imdbId: string = req.params.imdbId;

        let data;

        try {
            let movieData = await this._tmdbApi.find(imdbId);
            if (movieData != null) {
                cinfo(`Found movie for IMDB Id: ${imdbId}`);
                data = movieData.toData();
            }
            else {
                cinfo(`No movie found for IMDB Id: ${imdbId}`);
            }
        }
        catch(err) {
            cerr(err);
            data = err;
        }
        finally {
            res.status(200).json({ movie: data });
        }
    }
}
        