/*
* Title: Register Routes
* Description: Register all routes
* Author: Mamunur Rashid
* Date: 12/07/2022
*/
// dependencies
const {sampleHandler} = require('../handlers/sampleHandler/sampleHandler');
const {userHandler} = require('../handlers/userHandler');

// module scafolding
const routes = {
    sample: sampleHandler,
    users: userHandler,
};

module.exports = routes;