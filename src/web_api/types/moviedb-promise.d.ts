declare module 'moviedb-promise' {
    export default class {
        constructor(apiKey: string, useDefaultLimits?: boolean, baseUrl?: string);
        find(query: any): Promise<FindResult>;
        searchMovie(query: any): Promise<any>;
    }

    export class FindResult {
        movie_results: Array<MovieResult>;
        person_results: Array<any>;
        tv_results: Array<any>;
        tv_episode_results: Array<any>;
        tv_season_results: Array<any>;
    }

    export class MovieResult {
        adult: boolean;
        backdrop_path: string;
        genre_ids: Array<any>;
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
        popularity: number;
    }
}

