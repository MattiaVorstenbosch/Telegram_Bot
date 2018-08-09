'use strict';

// const request = require('request-promise');

// const options = {
//     method: 'GET',
//     uri: 'https://api.telegram.org/bot646247640:AAFTztegZGgyeFMpXXLdLnfWyNLrAesF6oY/getUpdates',
//     json: true,
// }

// request(options)
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((err) => {

//     });

const Telegram = require('telegram-node-bot'),
    PersistentMemoryStorage = require('./adapters/PersistentMemoryStorage'),
    storage = new PersistentMemoryStorage(
        `${__dirname}/data/userStorage.json`,
        `${__dirname}/data/chatStorage.json`
    ),
    tg = new Telegram.Telegram('646247640:AAFTztegZGgyeFMpXXLdLnfWyNLrAesF6oY', {
        workers: 1,
        storage: storage
    });

const TodoController = require('./controllers/todo'),
    OtherwiseController = require('./controllers/otherwise');

const todoCtrl = new TodoController();

tg.router.when(new Telegram.TextCommand('/add', 'addCommand'), todoCtrl)
    .when(new Telegram.TextCommand('/get', 'getCommand'), todoCtrl)
    .when(new Telegram.TextCommand('/check', 'checkCommand'), todoCtrl)
    .otherwise(new OtherwiseController());

function exitHandler(exitCode) {
    storage.flush();
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
// process.on('uncaughtException', exitHandler.bind(null, 1), (error) => {
//     console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
// });