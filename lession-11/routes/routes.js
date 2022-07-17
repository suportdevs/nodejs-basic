/*
* Title: Register Routes
* Description: Register all routes
* Author: Mamunur Rashid
* Date: 12/07/2022
*/
// dependencies
const {sampleHandler} = require('../handlers/sampleHandler/sampleHandler');
const {userHandler} = require('../handlers/userHandler');
const {tokenHandler} = require('../handlers/routeHandler/tokenHandler');

// module scafolding
const routes = {
    sample: sampleHandler,
    users: userHandler,
    token: tokenHandler,
};

module.exports = routes;