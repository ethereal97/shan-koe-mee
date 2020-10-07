import Cards from './src/Cards.js';
import { createCard } from './components/Card.js';
import { showModal, disableButton } from './components/helpers.js';

const cards = new Cards({
    el: document.querySelector('#drawn-cards')
});

let btn = {
    shuffle: document.querySelector('#shuffle'),
    draw: document.querySelector('#draw'),
    withdraw: document.querySelector('#withdraw'),
};

btn.shuffle.addEventListener('click', function() {
    var { resolve } = disableButton.call(this);
    cards.shuffle();
    console.log('Shuffled!', cards.all);
    resolve();
});

btn.draw.addEventListener('click', function() {
    var { resolve } = disableButton.call(this);

    try {
        var el = createCard(cards.draw());
        cards.el.appendChild(el).show();
    } catch (message) {
        console.error(message);
        showModal({
            title: 'ERROR',
            message
        }, {})
    } finally {
        resolve();
    }
});

btn.withdraw.addEventListener('click', function() {
    var { resolve } = disableButton.call(this);
    this.disabled = true;
    cards.withdraw();

    resolve();
});

window.app = cards;

var mm_numbers = [
    'ဘူကြီး',
    '၁ ပေါက်',
    '၂ ပေါက်',
    '၃ ပေါက်',
    '၄ ပေါက်',
    '၅ ပေါက်',
    '၆ ပေါက်',
    '၇ ပေါက်',
    '၈ ပေါက်',
    '၉ ပေါက်'
];

var game = {
    players: [{
            name: 'P1',
            cards: []
        },
        {
            name: 'P2',
            cards: []
        },
        {
            name: 'P3',
            cards: []
        },
        {
            name: 'P4',
            cards: []
        }
    ],

    start() {
        this.clear();
        var _ticked = false;
        var stt = () => {
            cards.shuffle().shuffle();
            for (var x = 0; x < 2; x++) {
                this.players.forEach(player => {
                    var c = cards.draw();
                    player.cards.push(c);
                    if (player.name === 'P1') {
                        setTimeout(() => {
                            if (_ticked === false) {
                                _ticked = true;
                                cards.el.appendChild(createCard(c).show()).elements[0].flip();
                            } else {
                                cards.el.appendChild(createCard(c).show());
                            }
                        }, 880 * x);
                    }
                });
            }
            this.compute();
            document.querySelector('#remaining .bar').classList.add('start');
        };
        setTimeout(stt, 860);
    },

    compute() {
        console.clear();
        this.players.forEach(player => {
            var [c1, c2] = player.cards;
            var [s1, v1] = c1;
            var [s2, v2] = c2;
            var [_v1, _v2] = [getValue(v1), getValue(v2)];
            var res, sum = _v1[1] + _v2[1];
            sum = sum.toString();
            res = sum.substr(sum.length - 1, 1);
            res = Number(res);
            var
                xza = false,
                doe = false;
            var stdout = [player.name, `ဖဲကတ် ${c1.join('')}, ${c2.join('')}`];
            if (res > 7) {
                doe = 'ဒို';
                stdout.push(doe);
            }
            var mm_v = mm_numbers[res];
            stdout.push(mm_v);
            if (s1 === s2) {
                xza = 'x၂ ဆ'
                stdout.push(xza);
            }
            console.log(stdout.join("\t"))
            if (player.name === 'P1') {
                if (doe) {
                    console.log(stdout.join("\t"));
                    setTimeout(function() {
                        cards.collection.elements[1].flip();
                        /*showModal({
                            title: '<strong>' + doe + ' ' + (xza || '') + '</strong>',
                            message: '<center>' + mm_v + '</center>',
                            icon: res == 8 ? 'chess queen' : 'chess king'
                        }, {});*/
                        alert
                    }, 2460);
                }

                if (res < 4) {
                    setTimeout(() => createCard(cards.draw()), 8000);
                }
            }
        });
    },

    clear() {
        btn.withdraw.click();

        this.players
            .forEach(player =>
                player.cards = []
            )
    }
}

function getValue(n) {
    var v = 0;
    switch (n) {
        case 'K':
            v = 13;
            n = 10;
            break;
        case 'Q':
            v = 12;
            n = 10;
            break;
        case 'J':
            v = 11;
            n = 10;
            break;
        case 'A':
            v = 14;
            n = 1;
            break;
        default:
            v = n = Number(n);
    }
    return [v, n];
}

window.game = game;

var to;

var st = window.st = () => {
    if (to) clearTimeout(to);
    var p = document.querySelector('.progress#remaining');
    var b = p.querySelector('.bar');
    b.classList.remove('start');
    $('.ui.modal').modal('hide');
    game.start();
    to = setTimeout(st, 12000);
};

to = setTimeout(st);