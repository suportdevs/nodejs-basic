/*
* Title: handle route
* Description: handle route
* Author: Mamunur Rashid
* Date: 12/07/2022
*/

// module scafolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        message: '404 page not found!'
    })
}

module.exports = handler;