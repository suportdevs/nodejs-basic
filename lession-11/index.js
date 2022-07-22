/*
* Title: Uptime monitor
* Description: rest api uptime monitor of user link
* Author: Mamunur Rashid
* Date: 12/07/2022
*/

// dependencies
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');

// app object - module scafolding
const app = {};


// create a server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);

    server.listen(environment.port, () => {
        console.log(`Listening to port ${environment.port}`);
    })
}

// handle server request and response
app.handleReqRes = handleReqRes;

// run server
app.createServer();