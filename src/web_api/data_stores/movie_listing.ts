import * as _ from 'lodash';
import { google } from 'googleapis';
import { cerr, cwarn } from 'simple-color-print';

import { ConfigDataStore } from './config_data_store';
import { MovieHeader } from '../entities/movie_header';

interface IMovieListing {
    getAll(): Promise<Array<MovieHeader> | null>
}

export class MovieListing implements IMovieListing {
    private _configDataStore: ConfigDataStore;

    constructor(configDataStore: ConfigDataStore) {
        this._configDataStore = configDataStore;        
    }

    async getAll() : Promise<Array<MovieHeader> | null> {
        const sheets = google.sheets('v4');

        let sheetsConfig = await this._configDataStore.getSheetsConfig();

        try {
            let result = await sheets.spreadsheets.values.get({
                auth: sheetsConfig.apiKey,
                spreadsheetId: sheetsConfig.spreadsheetId,
                range: 'Sheet1!A2:C'
            });

            let data = result.data;
            let rows = data.values;

            if (!_.isUndefined(rows) && rows.length) {
                return rows.map((row: Array<any>) => new MovieHeader(row[0], row[1], row[2]));
            } else {
                cwarn('No data found.');
                return [];
            }
        }
        catch (err) {
            cerr(`The API returned an error: ${err}`);
            return null;
        }
    }
}
