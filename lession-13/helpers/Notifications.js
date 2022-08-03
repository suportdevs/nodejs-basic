/*
* Title: User notification send
* Description: User notification send when her checks up and down
* Author: Mamunur Rashid
* Date: 03/08/2022
*/

// dependencies
const https = require('https');
const {twilio} = require('./environments');
const querystring = require('querystring');
const { parseJSON } = require('./utilities');

// module scafolding
const notifications = {};

notifications.sendTwilioSms = (phone, msg, callback) => {
    const userPhone = typeof(phone) === 'string' && phone.trim().length === 11 ? phone.trim() : false;

    const userMsg = typeof(msg) === 'string' && msg.trim().length <= 1600 ? msg.trim() : false;

    if(userPhone && userMsg){
        const payload = {
            From: twilio.fromPhone,
            To: `+88${userPhone}`,
            Body: userMsg
        }
        const payloadStringify = parseJSON(payload);

        const requestDetails = {
            hostname: 'api.twilio.com',
            method: 'POST',
            path: `/2010-04-01/Accounts/${twilio.accountSid}/Messages.json`,
            auth: `${twilio.accountSid}:${twilio.authToken}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }

        const req = https.request(requestDetails, (res) => {
            const status = res.statusCode;
            if(status === 200 || status === 201){
                callback(false);
            } else {
                callback(`Status code returned was ${status}`)
            }
        })

        req.on('error', (e) => {
            callback(e);
        })

        req.write(payloadStringify);
        req.end();
    } else {
        callback('Given parameters were missing or invalid!')
    }
}

// export module
module.exports = notifications;