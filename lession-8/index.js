/*
* Title: Uptime monitor
* Description: rest api uptime monitor of user link
* Author: Mamunur Rashid
* Date: 12/07/2022
*/

// dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');

// app object - module scafolding
const app = {};

// configs
app.config = {
    port: 3000,
}

// create a server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);

    server.listen(app.config.port, () => {
        console.log(`Listening to port ${app.config.port}`);
    })
}

// handle server request and response
app.handleReqRes = handleReqRes;

// run server
app.createServer();