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

    checkHandler($) {
        let index = parseInt($.message.text.split(' ').slice(1)[0]);;
        if (isNaN(index)) return $.sendMessage('Not a valid index');

        $.getUserSession('todos')
        .then(todos => {
            if (index >= todos.length) return $.sendMessage('You\'re index is too high.');
            todos.splice(index, 1);
            $.setUserSession('todos', todos);
            $.sendMessage('Checked todo!');
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
            'checkCommand': 'checkHandler'
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
