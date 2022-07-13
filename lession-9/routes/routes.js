/*
* Title: Register Routes
* Description: Register all routes
* Author: Mamunur Rashid
* Date: 12/07/2022
*/
// dependencies
const {sampleHandler} = require('../handlers/sampleHandler/sampleHandler');

// module scafolding
const routes = {
    sample: sampleHandler,
};

module.exports = routes;