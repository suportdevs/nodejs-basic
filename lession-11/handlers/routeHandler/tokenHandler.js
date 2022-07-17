/*
* Title: Token Handler
* Description: handler token related route
* Author: Mamunur Rashid
* Date: 16/07/2022
*/

// dependencies
const { parseJSON, hash, createRandomString } = require("../../helpers/utilities");
const data = require("../../lib/data");

// module scafolding

const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    console.log(requestProperties.method);
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if(acceptedMethod.indexOf(requestProperties.method) > -1){
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    }
}

handler._token = {};

handler._token.post = (requestProperties, callback) => {
    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length == 11 ? requestProperties.body.phone : false;

    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    if(phone && password){
        data.read('users', phone, (err, user) => {
            const hashPassword = hash(password);
            if(hashPassword === parseJSON(user).password){
                let tokenId = createRandomString(20);
                const expires = Date.now() * 60 * 60 * 1000;
                const tokenObject = {
                    phone,
                    'id': tokenId,
                    expires
                }

                data.create('tokens', tokenId, tokenObject, (err1) => {
                    if(err1){
                        callback(200, tokenObject);
                    } else {
                        callback(500, {
                            'error': 'There was a problem in server side!'
                        })
                    }
                })
            } else {
                callback(400, {
                    'error': 'Password is not valid!'
                })
            }
        })
    } else {
        callback(400, {
            'error': 'You have a problem in your request!'
        })
    }
}

handler._token.get = (requestProperties, callback) => {
    const id = typeof requestProperties.queryStringObject.id === 'string' && requestProperties.queryStringObject.id.length > 0 ? requestProperties.queryStringObject.id : false;

    if(id){
        data.read('tokens', id, (err, token) => {
            const tokenData = parseJSON(token);
            if(!err && token){
                callback(200, tokenData)
            } else {
                callback(404, {
                    'error': 'Requested token was not found!'
                })
            }
        })
    } else {
        callback(400, {
            'error': 'There was a problem in your request!'
        })
    }
}

module.exports = handler;