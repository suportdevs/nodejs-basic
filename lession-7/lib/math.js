/*
* Title: Genarate Random Number
* Description:
* Author: Mamunur Rashid
*
*/

// math object - module scafolding
const math = {};

math.getRandomNumber = function getRandomNumber(min, max){
    let minimum = min;
    let maxmum = max;
    minimum = typeof minimum === 'number' ? minimum : 0;
    maxmum = typeof maxmum === 'number' ? maxmum : 0;
    return Math.floor(Math.random() * (maxmum - minimum + 1) + min);
}

module.exports = math;