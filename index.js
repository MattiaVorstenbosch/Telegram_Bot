'use-strict';

const Telegram = require('telegram-node-bot'),
PersistMemoryStorage = require('./adapters/PersistMemoryStorage'),
    storage = new PersistMemoryStorage(
        `${__dirname}/data/userStorage.json`,
        `${__dirname}/data/chatStorage.json`,
    ),
    tg = new Telegram.Telegram('646247640:AAFTztegZGgyeFMpXXLdLnfWyNLrAesF6oY', {
        workers: 1,
        storage: storage,
    });

const TodoController = require('./controllers/todo')
    , OtherwiseController = require('./controllers/otherwise');

const todoCtrl = new TodoController();

tg.router
    .when(new Telegram.TextCommand('/add', 'addCommand'), todoCtrl)
    .when(new Telegram.TextCommand('/get', 'getCommand'), todoCtrl)
    .when(new Telegram.TextCommand('/check', 'checkCommand'), todoCtrl)
    .otherwise(new OtherwiseController());


function exitHandler(exitCode) {
    storage.flush();
    process.exit(exitCode);
    
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));

// https://api.telegram.org/bot646247640:AAFTztegZGgyeFMpXXLdLnfWyNLrAesF6oY/getUpdates?timeout=60
// https://api.telegram.org/bot646247640:AAFTztegZGgyeFMpXXLdLnfWyNLrAesF6oY/setWebhook