/*
* Title: userHandler
* Description: handle route for user 
* Author: Mamunur Rashid
* Date: 12/07/2022
*/

// dependencies
const data = require('../../lib/data');
const { parseJSON, hash } = require('../../helpers/utilities');
const tokenHandler = require('../routeHandler/tokenHandler');

// module scafolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if(acceptedMethod.indexOf(requestProperties.method) > -1){
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405);
    };
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
    // console.log(requestProperties)
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length == 11 ? requestProperties.body.phone : false;

    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const tosAgreement = typeof requestProperties.body.tosAgreement === 'boolean' ? requestProperties.body.tosAgreement : false;

    if(firstName && lastName && phone && password && tosAgreement){
        // make sure that the user dosen't already exists
        data.read('users', phone, (err, user) => {
            if(err){
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement
                };
                // store user data to db
                data.create('users', phone, userObject, (err2) => {
                    if(err2){
                        callback(200, {
                            'message': 'User created successfull.'
                        })
                    } else {
                        callback(500, {
                            'error': 'Could not user create!'
                        })
                    }
                })
            } else {
                callback(500, {
                    'error': 'There was a problem in server side.'
                })
            }
        })
    } else {
        callback(500, {
            'error': 'Something went wrong, missing params'
        })
    }
}
handler._users.get = (requestProperties, callback) => {
    const phone = typeof requestProperties.queryStringObject.phone === 'string' && requestProperties.queryStringObject.phone.trim().length == 11 ? requestProperties.queryStringObject.phone : false;

    if(phone){
        let token = typeof(requestProperties.headersObject.token) === 'string' ? requestProperties.headersObject.token : false;

        tokenHandler._token.verify(token, phone, (tokenId) => {
            if(tokenId){
                // lookup the user
                data.read('users', phone, (err, user) => {
                    const userData = {...parseJSON(user)};
                    if(!err && userData){
                        delete userData.password;
                        callback(200, userData);
                    }else {
                        callback(404, {
                            error: 'Requested user was not found.'
                        })
                    }
                })
            } else {
                callback(403, {
                    'error': 'Authentication was failure!'
                })
            }
        })
    } else {
        callback(404, {
            'error': 'There was problem in your request!'
        })
    }
}
handler._users.put = (requestProperties, callback) => {
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length == 11 ? requestProperties.body.phone : false;

    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const tosAgreement = typeof requestProperties.body.tosAgreement === 'boolean' ? requestProperties.body.tosAgreement : false;

    let token = typeof(requestProperties.headersObject.token) === 'string' ? requestProperties.headersObject.token : false;

    tokenHandler._token.verify(token, phone, (tokenId) => {
        if(tokenId){
            // lookup the user
            data.read('users', phone, (err, user) => {
                if(!err && user){
                    if(firstName || lastName || password){
                        const userData = { ...parseJSON(user) };
                        if(firstName){
                            userData.firstName = firstName;
                        }
                        if(lastName){
                            userData.lastName = lastName;
                        }
                        if(password){
                            userData.password = hash(password);
                        }
        
                        data.update('users', phone, userData, (err1) => {
                            if(!err1){
                                callback(200, {
                                    'message': 'User updated successfully.'
                                })
                            } else {
                                callback(500, {
                                    'error': 'There was problem in server side!'
                                })
                            }
                        })
                    } else {
                        callback(400, {
                            'error': 'You have a problem in your request!'
                        })
                    }
                } else {
                    callback(500, {
                        'error': 'There was an error in server side!'
                    })
                }
            })
        } else {
            callback(403, {
                'error': 'Authentication was failure!'
            })
        }
    })
}
handler._users.delete = (requestProperties, callback) => {
    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length == 11 ? requestProperties.body.phone : false;

    if(phone){
        let token = typeof(requestProperties.headersObject.token) === 'string' ? requestProperties.headersObject.token : false;
        // verify token
        tokenHandler._token.verify(token, phone, (tokenId) => {
            if(tokenId){
                // lookup the user
                data.read('users', phone, (err, user) => {
                    if(!err && user){
                        data.delete('users', phone, (err1) => {
                            if(!err){
                                callback(200, {
                                    'message': 'User was deleted successfully.'
                                })
                            } else {
                                callback(500, {
                                    'error': 'There was a server side error'
                                })
                            }
                        })
                    } else {
                        callback(500, {
                            'error': 'There was a problem in server side!'
                        })
                    }
                })
            } else {
                callback(403, {
                    'error': 'Authentication was failure!'
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