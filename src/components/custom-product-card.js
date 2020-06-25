import './custom-rating.js';

const template = document.createElement('template');

template.innerHTML = `
    <style>

        h6 {
            color: #373745;
            margin: 30px 0px 10px 0px;
            font-size: 27px;
        }

        h5 {
            color: #309ba6;
            margin: 5px 0px;
            font-size: 24px;
        }

        img {
            width: 80%;
            margin-bottom: 0px;
        }

        .container {
            padding: 8px;
            margin: auto;
            width: 300px;
            display: inline-block;
        }

        .card {
            display: block;
            overflow: hidden;
            position: relative;
            padding: 0 16px;
            font-size: 16px;
            font-weight: bold;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            outline: none;
            margin-top: 20px;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 0px solid #a1a1a1;
            border-radius: 10px;
            background: #ffffff;
            box-shadow: 0 10px 8px 0 rgba(0,0,0, 0.15), 0 2px 8px 0 rgba(161,161,161, 0.4);
            color: #363636;
            cursor: pointer;
        }
    </style>

    <div class="container">
        <div class="card">
            <h6 class="pname">Product Name</h6>
            <img src="">
            <h5 class="price1">Product Discount Price</h5>
            <p class="price2">Product Internet Price</p>
            <p class="price3">Product Normal Price</p>
            <custom-rating
                rating="0"
            >
            </custom-rating>
        </div>
    </div>
`;

class CustomProductCard extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: 'open' // Componente accesible
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true)); // Reusable en el HTML
        this.$card = this._shadowRoot.querySelector('.card');
        this.$pname = this._shadowRoot.querySelector('.pname');
        this.$img = this._shadowRoot.querySelector("img");
        this.$price1 = this._shadowRoot.querySelector('.price1');
        this.$price2 = this._shadowRoot.querySelector('.price2');
        this.$price3 = this._shadowRoot.querySelector('.price3');
    }

    get rating() {
        return this.getAttribute('rating');
    }

    set rating(value) {
        this.setAttribute('rating', value);
    }

    get img() {
        return this.getAttribute('img');
    }

    set img(value) {
        this.setAttribute('img', value);
    }

    get pname() {
        return this.getAttribute('pname');
    }

    set pname(value) {
        this.setAttribute('pname', value);
    }

    get price1() {
        return this.getAttribute('price1');
    }

    set price1(value) {
        this.setAttribute('price1', value);
    }

    get price2() {
        return this.getAttribute('price2');
    }

    set price2(value) {
        this.setAttribute('price2', value);
    }

    get price3() {
        return this.getAttribute('price3');
    }

    set price3(value) {
        this.setAttribute('price3', value);
    }

    static get observedAttributes() {
        return ['pname', 'img', 'rating', 'price1', 'price2', 'price3'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    render() {
        this.$pname.innerHTML = this.pname;
        this.$img.src = this.img;
        this.$price1.innerHTML = this.price1;
        this.$price2.innerHTML = this.price2;
        this.$price3.innerHTML = this.price3;
    }
}

window.customElements.define('custom-product-card', CustomProductCard);