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
const lib = require('./lib/data');

// app object - module scafolding
const app = {};

// @TODO: todo
// lib.update('test', 'newFile', {'name': 'England'}, (err) => {
//     console.log(err);
// })
lib.delete('test', 'newFile', (err) => {
    console.log(err);
})

// create a server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);

    server.listen(environment.port, () => {
        console.log(environment.envName);
        console.log(`Listening to port ${environment.port}`);
    })
}

// handle server request and response
app.handleReqRes = handleReqRes;

// run server
app.createServer();