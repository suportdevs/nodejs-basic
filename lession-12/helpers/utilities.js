/*
* Title: Utilities
* Description: utilities function
* Author: Mamunur Rashid
* Date: 14/07/2022
*
*/

// dependencies
const crypto = require('crypto');
const environment = require('../helpers/environments');

// module scafolding
const utilities = {};


utilities.parseJSON = (jsonStr) => {
    let output;
    try{
        output = JSON.parse(jsonStr);
    } catch {
        output = {};
    }
    return output;
};

// hash string
utilities.hash = (str) => {
    if(typeof(str) === 'string' && str.length > 0){
        const hash = crypto.createHmac('sha256', environment.secretKey)
        .update(str)
        .digest('hex');
        return hash;
    }
    return false;
}

utilities.createRandomString = (strLength) => {
    const length = typeof strLength === 'number' && strLength > 0 ? strLength : false;

    if(length){
        const possibleCharactors = 'abcdefghijklmnopqrstwxyz012356789';
        let output = '';
        for(let i=1; i<=length; i+=1){
            const randomCharactor = possibleCharactors.charAt(Math.floor(Math.random() * possibleCharactors.length))
            output += randomCharactor;
        }
        return output;
    }
    return false;
}

module.exports = utilities;