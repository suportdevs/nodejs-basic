/*
* Title: Read file 
* Description:
* Author: Mamunur Rashid
*
*/

// devdependence
const fs = require('fs');

// quote object - scafolding module
const quotes = {};

quotes.allQuotes = function allQuotes(){
    const fileContents = fs.readFileSync(`${__dirname}/quotes.txt`, 'utf8');

    const arrayOfQuotes = fileContents.split(/\r?\n/);

    return arrayOfQuotes;
}

module.exports = quotes;