/*
* Title: handle route
* Description: handle route
* Author: Mamunur Rashid
* Date: 12/07/2022
*/

// module scafolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, {
        message: 'this is sample page',
    })
}

module.exports = handler;