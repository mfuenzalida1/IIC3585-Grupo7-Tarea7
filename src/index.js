import './components/custom-dropdown.js';
import './components/custom-product-card.js';

const template = document.createElement('template');

// Se utilizo el template inicial: https://github.com/rwieruch/web-components-starter-kit

template.innerHTML = `
    <style>
        h1 {
            color: white;
            margin-bottom: 80px;
            font-size: 45px;
            text-shadow: 2px 1px 2px #4c4d4f;
        }

        h5 {
            color: white;
            margin-bottom: 0px;
            margin-top: 50px;
            font-size: 36px;
            text-shadow: 2px 1px 2px #4c4d4f;
        }

        hr.rounded {
            border-top: 5px solid white;
            border-radius: 5px;
            background-color: white;
        }

        .component-section {
            margin: 50px 0 100px 0;
        }

    </style>

	<div>
        <h1>Reusable Web Components</h1>

        <hr class="rounded" color="white">
        <h5>Selector</h5>
        <div class="component-section">
            <custom-dropdown
                label="Seleccionar ingredientes"
                option="option1"
                options='{ 
                            "option1": { "label": "Pepperoni" },
                            "option2": { "label": "Pimentón" },
                            "option3": { "label": "Tomate" },
                            "option4": { "label": "Jamón" },
                            "option5": { "label": "Aceitunas" }
                        }'
            ></custom-dropdown>
            <custom-dropdown
                option="option2"
                options='{ 
                            "option1": { "label": "Pepperoni" },
                            "option2": { "label": "Pimentón" },
                            "option3": { "label": "Tomate" },
                            "option4": { "label": "Jamón" },
                            "option5": { "label": "Aceitunas" }
                        }'
            ></custom-dropdown>
            <custom-dropdown
                option="option3"
                options='{ 
                            "option1": { "label": "Pepperoni" },
                            "option2": { "label": "Pimentón" },
                            "option3": { "label": "Tomate" },
                            "option4": { "label": "Jamón" },
                            "option5": { "label": "Aceitunas" }
                        }'
            ></custom-dropdown>
        </div>
        <hr class="rounded" color="white">

        <h5>E-commerce Card</h5>
        <div class="component-section">
            <custom-product-card
                pname="Xaomi Mi 9"
                img="https://i01.appmifile.com/webfile/globalimg/Syueting/bldack.png"
                price1="$189.990"
                price2="Internet: $200.000"
                price3="Normal: $240.000"
                rating="5"
            >
            </custom-product-card>
            <custom-product-card
                pname="Motorola G8 Play"
                img="https://www.electrorates.com/blogimg/Motorola_Moto_G8_Play.png"
                price1="$135.000"
                price2="Internet: $190.000"
                price3="Normal: $200.000"
                rating=""
            >
            </custom-product-card>
        </div>

        <hr class="rounded" color="white">

        <h5>Componente 3</h5>
        <div class="component-section"></div>
        
        <hr class="rounded" color="white">

        <h5>Componente 4</h5>
        <div class="component-section"></div>

        <hr class="rounded" color="white">

        <h5>Componente 5</h5>
        <div class="component-section"></div>
	</div>
`;

class App extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        /*
        this.$input = this._shadowRoot.querySelector('input');
        this.$input.addEventListener('input', this._handleChange.bind(this));
        */

        this.$customDropdown = this._shadowRoot.querySelector('custom-dropdown');

        this.$customDropdown.addEventListener(
            // Captura el onChange desde un componente hijo de custom-dropdown
            'onChange', value => {
                console.log(value);
            }
        );
    }

    _handleChange() {

    }
}

window.customElements.define('my-app', App);