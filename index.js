'use-strict';

const Telegram = require('telegram-node-bot');
tg = new Telegram.Telegram('646247640:AAFTztegZGgyeFMpXXLdLnfWyNLrAesF6oY', {
    workers: 1,
});

const TodoController = require('./controllers/todo')
    , OtherwiseController = require('./controllers/otherwise');

const todoCtrl = new TodoController();

tg.router
    .when(new Telegram.TextCommand('/add', 'addCommand'), todoCtrl)
    .when(new Telegram.TextCommand('/get', 'getCommand'), todoCtrl)
    .otherwise(new OtherwiseController());


// https://api.telegram.org/bot646247640:AAFTztegZGgyeFMpXXLdLnfWyNLrAesF6oY/getUpdates?timeout=60
// https://api.telegram.org/bot646247640:AAFTztegZGgyeFMpXXLdLnfWyNLrAesF6oY/setWebhook