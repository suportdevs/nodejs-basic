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
    envName: 'Staging',
    secretKey: 'password',
    maxChecks: 5
};

environments.production = {
    port: 5000,
    envName: 'Production',
    secretKey: 'password',
    maxChecks: 5
};

// current environment
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// chose curresponding environment variable
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : {};

module.exports = environmentToExport;

