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
    maxChecks: 5,
    twilio: {
        fromPhone: '+18022276192',
        accountSid: 'AC6cecc55ad4b577dfb799b4ed092a0275',
        authToken: '3ad3ef56caee48c93b1fc6c2659afbef'
    }
};

environments.production = {
    port: 5000,
    envName: 'Production',
    secretKey: 'password',
    maxChecks: 5,
    twilio: {
        fromPhone: '+18022276192',
        accountSid: 'AC6cecc55ad4b577dfb799b4ed092a0275',
        authToken: '3ad3ef56caee48c93b1fc6c2659afbef'
    }
};

// current environment
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// chose curresponding environment variable
const environmentToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : {};

module.exports = environmentToExport;

