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
const {parseJSON} = require('../helpers/utilities');

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
    
    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[trimedUrl] ? routes[trimedUrl] : notFoundHandler;

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        
        requestProperties.body = parseJSON(realData);

        chosenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof(statusCode) ? statusCode : 500;
            payload = typeof(payload) ? payload : {};
    
            const payloadString = JSON.stringify(payload);
    
            res.setHeader('Content-type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        })

    })
}


module.exports = handle;