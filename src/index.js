import './components/say-something.js';
import './components/custom-dropdown.js';

const template = document.createElement('template');

// Se utilizo el template inicial: https://github.com/rwieruch/web-components-starter-kit

template.innerHTML = `
    <style>

    </style>

	<div>
		<h1>Web Components with Webpack Starter Kit</h1>

		Text: <input type="text" />

		<say-something></say-something>

		<say-something color="red"></say-something>

        <custom-dropdown
            label="Selector"
            option="option1"
            options='{ 
                        "option1": { "label": "Pepperoni" },
                        "option2": { "label": "Pimentón" },
                        "option3": { "label": "Tomate" },
                        "option4": { "label": "Jamón" },
                        "option5": { "label": "Aceitunas" }
                    }'
        ></custom-dropdown>

	</div>
`;

class App extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.$input = this._shadowRoot.querySelector('input');
        this.$input.addEventListener('input', this._handleChange.bind(this));

        this.$allSaySomething = this._shadowRoot.querySelectorAll('say-something');
        this.$customDropdown = this._shadowRoot.querySelector('custom-dropdown');

        this.$customDropdown.addEventListener(
            // Captura el onChange desde un componente hijo de custom-dropdown
            'onChange', value => {
                console.log(value);
            }
        );
    }

    _handleChange() {
        this.$allSaySomething.forEach(element => {
            element.setAttribute('text', this.$input.value);
        });
    }
}

window.customElements.define('my-app', App);