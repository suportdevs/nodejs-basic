/*
* Title: Token Handler
* Description: handler token related route
* Author: Mamunur Rashid
* Date: 16/07/2022
*/

// dependency
const { parseJSON, createRandomString } = require('../../helpers/utilities');
const data = require('../../lib/data');
const tokenHandler = require('./tokenHandler');
const { maxChecks } = require('../../helpers/environments');

// module scafolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if(acceptedMethod.indexOf(requestProperties.method) > -1){
        handler._check[requestProperties.method](requestProperties, callback);
    }
}

handler._check = {};

handler._check.post = (requestProperties, callback) => {
    const protocol = typeof requestProperties.body.protocol === 'string' && ['http', 'https'].indexOf(requestProperties.body.protocol) > -1 ? requestProperties.body.protocol : false;

    const url = typeof requestProperties.body.url === 'string' && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url : false;

    const method = typeof requestProperties.body.method === 'string' && ['GET', 'POST', 'PUT', 'DELETE'].indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method : false;

    const successCodes = typeof requestProperties.body.successCodes === 'object' && requestProperties.body.successCodes instanceof Array ? requestProperties.body.successCodes : false;

    const timeOutSeconds = typeof requestProperties.body.timeOutSeconds === 'number' && requestProperties.body.timeOutSeconds % 1 === 0 && requestProperties.body.timeOutSeconds >= 1 && requestProperties.body.timeOutSeconds <= 5 ? requestProperties.body.timeOutSeconds : false;

    if(protocol && url && method && successCodes && timeOutSeconds){
        const token = typeof requestProperties.headersObject.token === 'string' && requestProperties.headersObject.token.trim().length > 0 ? requestProperties.headersObject.token : false;

        // lookup the user phone by reading token
        data.read('tokens', token, (err, tokenData) => {
            if(!err && tokenData){
                const userPhone = parseJSON(tokenData).phone;
                // lookup the use
                data.read('users', userPhone, (err1, userData) => {
                    if(!err1 && userData){
                        tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
                            if(tokenIsValid){
                                let userObject = parseJSON(userData);
                                let userChecks = typeof userObject.checks === 'object' && userObject.checks instanceof Array ? userObject.checks : [];

                                if(userChecks.length < maxChecks){
                                    let checkId = createRandomString(20);
                                    const checkObject = {
                                        id: checkId,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCodes,
                                        timeOutSeconds
                                    }
                                    data.create('checks', checkId, checkObject, (err2) => {
                                        if(!err2){
                                            userObject.checks = userChecks;
                                            userObject.checks.push(checkId);
                                            console.log("userObject")
                                            
                                            data.update('users', userPhone, userObject, (err3) => {
                                                if(!err3){
                                                    callback(200, checkObject);
                                                } else {
                                                    callback(500, {
                                                        error: 'There was a server side problem!'
                                                    })
                                                }
                                            })
                                        } else {
                                            callback(500, {
                                                error: 'There was a server side error!'
                                            })
                                        }
                                    })
                                } else {
                                    callback(401, {
                                        error: 'Use has already reached max check limit!'
                                    })
                                }
                            } else {
                                callback(403, {
                                    error: "Authentication problem!"
                                })
                            }
                        })
                    } else {
                        callback(403, {
                            error: 'User not found!'
                        })
                    }
                })
            } else {
                callback(403, {
                    error: 'Authentication faild!'
                })
            }
        })
    } else {
        callback(400, {
            error: 'You have a problem in your request!'
        })
    }
}
handler._check.get = (requestProperties, callback) => {
    const id = typeof requestProperties.queryStringObject.id === 'string' && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id : false;

    if(id){
        // lookup the checks
        data.read('checks', id, (err1, checkData) => {
            if(!err1 && checkData){
                const token = typeof requestProperties.headersObject.token === 'string' ? requestProperties.headersObject.token : false;

                tokenHandler._token.verify(token, parseJSON(checkData).userPhone, (tokenIsValid) => {
                    if(tokenIsValid){
                        callback(200, parseJSON(checkData));
                    } else {
                        callback(400, {
                            error: "Authentication failure!"
                        })
                    }
                })
            } else {
                callback(500, {
                    error: 'There was a server side error!'
                })
            }
        })
    } else {
        callback(403, {
            error: 'There was a error in your request!'
        })
    }
}
handler._check.put = (requestProperties, callback) => {
    const id = typeof requestProperties.body.id === 'string' && requestProperties.body.id.trim().length === 20 ? requestProperties.body.id : false;

    const protocol = typeof requestProperties.body.protocol === 'string' && ['http', 'https'].indexOf(requestProperties.body.protocol) > -1 ? requestProperties.body.protocol : false;

    const url = typeof requestProperties.body.url === 'string' && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url : false;

    const method = typeof requestProperties.body.method === 'string' && ['GET', 'POST', 'PUT', 'DELETE'].indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method : false;

    const successCodes = typeof requestProperties.successCodes === 'object' && requestProperties.body.successCodes instanceof Array ? requestProperties.body.successCodes : false;

    const timeOutSeconds = typeof requestProperties.body.timeOutSeconds === 'number' && requestProperties.body.timeOutSeconds % 1 === 0 && requestProperties.body.timeOutSeconds < 1 && requestProperties.body.timeOutSeconds >= 5 ? requestProperties.body.timeOutSeconds : false;

    if(id){
        if(protocol || url || method || successCodes || timeOutSeconds){
            // lookup the checks
            data.read('checks', id, (err1, checkData) => {
                if(!err1 && checkData){
                    const checkObject = parseJSON(checkData);
                    const token = typeof requestProperties.headersObject.token === 'string' && requestProperties.headersObject.token.trim().length > 0 ? requestProperties.headersObject.token : false;
                    tokenHandler._token.verify(token, checkObject.userPhone, (tokenIsValid) => {
                        if(tokenIsValid){
                            if(protocol){
                                checkObject.protocol = protocol;
                            }
                            if(url){
                                checkObject.url = url;
                            }
                            if(method){
                                checkObject.method = method;
                            }
                            if(successCodes){
                                checkObject.successCodes = successCodes;
                            }
                            if(timeOutSeconds){
                                checkObject.timeOutSeconds = timeOutSeconds;
                            }

                            data.update('checks', id, checkObject, (err2) => {
                                if(!err2){
                                    callback(200, checkObject);
                                } else {
                                    callback(500, {
                                        error: "There was a server side error!"
                                    })
                                }
                            })
                        } else {
                            callback(403, {
                                error: "Authentication failure!"
                            })
                        }
                    })
                } else {
                    callback(500, {
                        error: "There was a server side error!"
                    })
                }
            })
        } else {
            callback(400, {
                error: "You must provide at last one field to update!"
            })
        }
    } else {
        callback(403, {
            error: 'There was a error in your request!'
        })
    }
}
handler._check.delete = (requestProperties, callback) => {
    
}

module.exports = handler;