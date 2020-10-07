const config = {
    symbols: ['spade', 'heart', 'diamond', 'club'],
    cards: ['K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'A']
}

let cards = [];
let drawn = [];

export default class Cards {
    constructor({ el }) {
        this.el = el;
    }

    shuffle() {
        cards = shuffle();

        return this;
    }

    get all() {
        return cards;
    }

    get drawn() {
        return drawn;
    }

    get collection() {
        return this.el.querySelector('app-card .cards');
    }

    draw() {
        var card = cards.pop();
        drawn.push(card);

        return card;
    }

    withdraw() {
        while (drawn.length) {
            cards.push(drawn.pop());
        }

        this.collection && this.collection.clear();

        return this;
    }
}

/** generating cards list **/
for (let a in config.symbols) {
    var symbol = config.symbols[a];
    for (let b in config.cards) {
        var value = config.cards[b];
        cards.push([symbol, value]);
    }
}

function shuffle() {
    var n = Math.floor(cards.length / 4);
    var a = cards.slice(0, n);
    var b = cards.slice(n, n * 2);
    var c = cards.slice(n * 2, n * 3);
    var d = cards.slice(n * 3);
    var r = () => Math.floor(Math.random() * 4);

    var results = [
        [],
        [],
        [],
        []
    ];

    for (let i in a) {
        results[r()].push(a[i]);
        results[r()].push(b[i]);
        results[r()].push(c[i]);
    }
    for (let i in d) {
        results[r()].push(d[i]);
    }

    var [a, b, c, d] = results;

    return [...a, ...b, ...c, ...d];
}

cards = shuffle();