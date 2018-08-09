'use strict';

const request = require('request-promise');

class getUpdates extends Telegram.TelegramBaseController {

const options = {
    method: 'GET',
    uri: 'https://api.telegram.org/bot646247640:AAFTztegZGgyeFMpXXLdLnfWyNLrAesF6oY/getUpdates',
    json: true,
}

request(options)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {

    });
}
module.exports = getUpdates;