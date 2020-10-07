const MAX_DRAWABLE_CARD = 3;

const SYMBOL_DICT = {
    spade: ['♠️', '#4b4a44'],
    heart: ['♥️', '#a83f39'],
    diamond: ['♦️', '#a83f39'],
    club: ['♣️', '#4b4a44'],

    get pike() {
        return this.spade;
    },
    get clover() {
        return this.club;
    },
    get tile() {
        return this.diamond;
    }
};

let instance, add;

class Card extends HTMLElement {
    constructor(parent) {
        super();

        if (parent instanceof HTMLElement) {
            this.parentElement = parent;
        }

        this.elements = [];

        this.cards = document.createElement('div');
        this.cards.className = 'ui cards';
    }

    add(card) {
        newCard.call(this);

        var [name, value] = card;
        var [icon, color] = SYMBOL_DICT[name];

        this.front.classList.add(name);
        this.front.innerText = [icon, value].join(' ');

        return this;
    }

    clear() {
        for (var i in this.elements) {
            this.elements[i].remove();
        }
        this.elements = [];
        return this;
    }

    show() {
        this.appendChild(this.cards);
        this.cards.clear = this.clear.bind(this);
        this.cards.add = this.add.bind(this);
        return this;
    }
}

customElements.define('app-card', Card);

export function createCard(value) {
    if (!instance) {
        instance = document.createElement('app-card');
    }
    return instance.add(value);
}

function newCard() {
    if (this.cards.childNodes.length >= MAX_DRAWABLE_CARD) {
        throw "Reached max drawable card limit!"
    }

    this.card = document.createElement('div');
    this.content = document.createElement('div');

    this.card.className = 'card';
    this.content.className = 'content';

    this.card.flip = function() {
        this.classList.toggle('flipped');
    };
    this.card.addEventListener('click', this.card.flip.bind(this.card));
    this.elements.push(this.card);
    this.cards.elements = this.elements;
    this.card.setAttribute('readability', '6');
    this.content.setAttribute('readability', '3');

    this.back = document.createElement('div');
    this.front = document.createElement('div');

    this.back.className = 'back';
    this.front.className = 'front header';

    this.content.appendChild(this.back);
    this.content.appendChild(this.front);
    this.card.appendChild(this.content);
    this.cards.appendChild(this.card);
}