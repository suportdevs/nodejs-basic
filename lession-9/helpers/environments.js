/*
* Title: handle all environment 
* Description: handle all environment variables
* Author: Mamunur Rashid
* Date: 13/07/2022
*/

// module scafolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'Staging'
};

environments.production = {
    port: 5000,
    envName: 'Production'
};

// current environment
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// chose curresponding environment variable
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : {};

module.exports = environmentToExport;

