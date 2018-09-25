import express from 'express';
import * as bodyParser from 'body-parser'
import { Server } from '@overnightjs/core'
import { cimp } from 'simple-color-print'
import { MovieController } from './movie_controller'
import { ConfigDataStore } from './data_stores/config_data_store';

export class SampleServer extends Server {
    constructor() {
        super();
        this.setupExpress();
        
        let controllers = this.setupControllers();
        super.addControllers_(controllers);
    }

    private setupExpress(): void {
        this.app_.use(bodyParser.json());
        this.app_.use(bodyParser.urlencoded({extended: true}));
        this.app_.use(express.static('public'));
    }

    private setupControllers(): Array<any> {
        let configDataStore = new ConfigDataStore();
        let movieController = new MovieController(configDataStore);

        return [
            movieController
        ]
    }

    public start(port: number) {
        this.app_.listen(port, () => {
            cimp('Server listening on port:' + port);
        })
    }
}