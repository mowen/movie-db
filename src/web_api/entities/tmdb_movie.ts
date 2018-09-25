import * as MovieDb from 'moviedb-promise';

export class TmdbMovie {
    get title(): string { return this.movieResult.title; }
    get posterUrl(): string { return this.ImageBaseUrl + this.movieResult.poster_path; }
    get backdropUrl(): string { return this.ImageBaseUrl + this.movieResult.backdrop_path; }
    get overview(): string { return this.movieResult.overview; }
    get releaseDate(): string { return this.movieResult.release_date; }

    private movieResult: MovieDb.MovieResult;

    private readonly ImageBaseUrl: string = 'https://image.tmdb.org/t/p/w500';

    constructor(movieResult: MovieDb.MovieResult) {
        this.movieResult = movieResult;
    }

    toString(): string {
        return `${this.title}\n${this.posterUrl}\n${this.backdropUrl}\n${this.releaseDate}\n${this.overview}\n\n`;
    }

    toData(): any {
        return {
            title: this.title,
            posterUrl: this.posterUrl,
            backdropUrl: this.backdropUrl,
            overview: this.overview,
            releaseDate: this.releaseDate
        }
    } 
}
