/*
* Title: handle request and response
* Description: handle user request and response
* Author: Mamunur Rashid
* Date: 12/07/2022
*/

// dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('../routes/routes');
const { notFoundHandler } = require('../handlers/notFoundHandler/notFoundHandler');

// module scafolding
const handle = {};

handle.handleReqRes = (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimedUrl = path.replace(/^\/+|\/+$/g, '');
    const queryStringObject = parseUrl.query;
    const method = req.method.toLowerCase();
    const headersObject = req.headers;

    const requestProperties = {
        parseUrl,
        path,
        trimedUrl,
        queryStringObject,
        method,
        headersObject
    };
    const chosenHandler = routes[trimedUrl] ? routes[trimedUrl] : notFoundHandler;

    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof(statusCode) ? statusCode : 500;
        payload = typeof(payload) ? payload : {};

        const payloadString = JSON.stringify(payload);

        res.writeHead(statusCode);
        res.end(payloadString);
    })
    
    const decoder = new StringDecoder('utf-8');
    let realData = '';
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        res.end('hello world');
    })
}


module.exports = handle;