let Server
Server = require('./build/web_api/app.js').SampleServer
new Server().start(3000)