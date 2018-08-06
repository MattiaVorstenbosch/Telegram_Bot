'use-strict';

const Telegram = require('telegram-node-bot');

class TodoController extends Telegram.TelegramBaseController {
    addHandler($) {
        let todo = $.message.text.split(' ').slice(1).join(' '); // add Foo bar

        if (!todo) return $.sendMessage('Please pass a todo Item');
        $.getUserSession('todos')
            .then(todos => {
                if (!Array.isArray(todos)) $.setUserSession('todos', [todo]);
                else $.setUserSession('todos', todos.concat([todo]));
                $.sendMessage('Added new todo!');

            });
    }

    getHandler($) {
        $.getUserSession('todos').then(todos => {
            $.sendMessage(this._serializeList(todos), {parse_mode: 'Markdown'}); // [foo, bar] --> foo, bar
        });
    }

    get routes() {
        return {
            'addCommand': 'addHandler',
            'getCommand': 'getHandler',
        };
    }

    _serializeList(todoList) {
        let serialized = '*Your Todos:*\n';
        todoList.forEach((item, i) => {
            serialized += `*${i}* - ${item}\n`;
        });
        return serialized;
    }
}

module.exports = TodoController;
