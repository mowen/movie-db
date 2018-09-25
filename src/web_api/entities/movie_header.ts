export class MovieHeader {
    constructor(public title: string, public format: string, public imdbId: string) {
    }

    toData(): any {
        return {
            imdbId: this.imdbId,
            title: this.title,
            format: this.format
        };
    }
}