import './components/say-something.js';
import './components/custom-button.js';

const template = document.createElement('template');

// Se utilizo el template inicial: https://github.com/rwieruch/web-components-starter-kit

template.innerHTML = `
	<style>
		:host {
			font-family: sans-serif;
		}
	</style>

	<div>
		<h1>Web Components with Webpack Starter Kit</h1>

		Text: <input type="text" />

		<say-something></say-something>

		<say-something color="red"></say-something>

		<custom-button label="hola"></custom-button>
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
        this.$customButton = this._shadowRoot.querySelector('custom-button');

        this.$customButton.addEventListener(
            // Captura el onClick desde un componente hijo de custom-button
            'onClick', value => {
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