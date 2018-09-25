# Building

    # Install modules
    npm install

    # web_api express web service build
    tsc

    # web_ui vue single-page-app build
    npm run build

# Running

    # Start app at http://localhost:3000
    npm start

# Config

A config file in the following format is expected in src/config.json:

    {
        "sheets": {
            "api_key": "Google Account API Key",
            "spreadsheet_id": "<Google Sheets Spreadsheet ID (should allow read access)>"
        },
        "tmdb": {
            "api_key": "<The Movie Database API Key>"
        }
    }