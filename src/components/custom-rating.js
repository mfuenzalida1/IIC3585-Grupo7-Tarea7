const template = document.createElement('template');

template.innerHTML = `
    <style>
        .container {
            padding: 8px;
            margin: auto;

        }
        
        .stars {
            display: block;
            overflow: hidden;
            position: relative;
            padding: 0 16px;
            font-size: 16px;
            font-weight: bold;
            text-overflow: ellipsis;
            outline: none;
            margin-top: 0px;
            margin-bottom: 15px;
            width: 100%;
            height: 50px;
            box-sizing: border-box;
            border-radius: 10px;
            background: #ffffff;
            color: #363636;
        }

        span {
            font-size: 34px;
            cursor: pointer;
            padding: 0px;
        }

        .stars {
            unicode-bidi: bidi-override;
            direction: rtl;
        }

        .stars > span {
            display: inline-block;
            position: relative;
            width: 26px;
            color: #242322;
        }

        .stars > span:hover:before,
        .stars > span:hover ~ span:before {
            content: "★";
            position: absolute;
            color: orange;
        }

    </style>
    
    <div class="container">
        <div class="stars">
            <span class="star1">★</span>
            <span class="star2">★</span>
            <span class="star3">★</span>
            <span class="star4">★</span>
            <span class="star5">★</span>
        </div>
    </div>
`;

class CustomRating extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: 'open' // Componente accesible
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true)); // Reusable en el HTML
        this.$container = this._shadowRoot.querySelector('.container');
        this.$stars = [
            this._shadowRoot.querySelector('.star1'),
            this._shadowRoot.querySelector('.star2'),
            this._shadowRoot.querySelector('.star3'),
            this._shadowRoot.querySelector('.star4'),
            this._shadowRoot.querySelector('.star5'),
        ];
        for (let i = 0; i < this.$stars.length; i++) {
            this.$stars[i].addEventListener('click', () => {
                this.rating = this.$stars.length - i;
                this.render();
            });
        }
    }

    get rating() {
        return parseInt(this.getAttribute('rating'));
    }

    set rating(value) {
        this.setAttribute('rating', value);
    }

    static get observedAttributes() {
        return ['rating'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    render() {
        // Se marcan las estrellas segun el rating
        for (let i = 0; i < this.$stars.length; i++) {
            if (i < this.rating) {
                this.$stars[this.$stars.length - 1 - i].style.color = "orange";
            } else {
                this.$stars[this.$stars.length - 1 - i].style.color = "#242322";
            }
        }
    }
}

window.customElements.define('custom-rating', CustomRating);