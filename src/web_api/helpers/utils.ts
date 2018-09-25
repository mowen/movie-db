import fs from 'fs';
import path from 'path';
import { cerr } from 'simple-color-print';

export class Utils {
    static async readJsonFile(filename: string): Promise<any> {
        try {
            let fullFilename = path.join(__dirname, '..', '..', '..', 'src', 'web_api', filename); 
            let jsonString = await fs.promises.readFile(fullFilename, { encoding: 'utf8' });
            return JSON.parse(jsonString);
        }
        catch (err) {
            cerr(err);
            return null;
        }
    }
}

