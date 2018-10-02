import { Utils } from '../helpers/utils';

export class SheetsConfig {
    constructor(public spreadsheetId: string, public apiKey: string) { }
}

export class TmdbConfig {
    constructor(public apiKey: string) { }
}

export class FirebaseConfig {
    constructor(public config: any) { }
}

export class ConfigDataStore {

    private static ConfigFilename: string = 'config.json';

    private _config: any | null;

    constructor() {
        this._config = null;
    }

    async getSheetsConfig(): Promise<SheetsConfig> {
        let config = await this.getConfig();
        return new SheetsConfig(config.sheets.spreadsheet_id, config.sheets.api_key);
    }

    async getTmdbConfig(): Promise<TmdbConfig> {
        let config = await this.getConfig();
        return new TmdbConfig(config.tmdb.api_key);
    }

    async getFirebaseConfig(): Promise<FirebaseConfig> {
        let config = await this.getConfig();
        return new FirebaseConfig(config.firebase);
    }

    private async getConfig(): Promise<any> {
        if (this._config == null) {
            this._config =  await Utils.readJsonFile(ConfigDataStore.ConfigFilename);
        }
        return this._config;
    }
}