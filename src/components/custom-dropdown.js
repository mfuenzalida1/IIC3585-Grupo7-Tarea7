import './custom-button.js';

const template = document.createElement('template');

template.innerHTML = `
    <style>
        :host {
            font-family: sans-serif;
        }

        .dropdown {
            padding: 3px 8px 8px;
            text-align: center;
        }

        .label {
            display: block;
            margin-bottom: 20px;
            color: white;
            font-size: 22px;
            font-weight: normal;
            line-height: 16px;
        }

        .dropdown-list-container {
            position: relative;
            margin: auto;
            width: 300px;
        }

        .dropdown-list {
            position: absolute;
            z-index: 1;
            width: 100%;
            display: none;
            max-height: 400px;
            overflow-y: auto;
            margin: auto;
            padding: 0px;
            margin-top: 2px;
            background-color: #ffffff;
            border: 0px solid #a1a1a1;
            border-radius: 10px;
            box-shadow: 0 10px 8px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
            list-style: none;
        }

        .dropdown-list li {
            display: flex;
            align-items: center;
            margin: 4px 0;
            padding: 0px 20px;
            font-size: 16px;
            height: 40px;
            cursor: pointer;
        }

        .dropdown-list li:hover {
            background-color: #e3e5e8;
        }

        .dropdown-list li.selected {
            font-weight: 600;
        }

        .dropdown.open .dropdown-list {
            display: flex;
            flex-direction: column;
        }
        
    </style>

    <div class="dropdown">
        <span class="label">Label</span>
        <custom-button as-atom></custom-button>
        <div class="dropdown-list-container">
            <ul class="dropdown-list"></ul>
        </div>
    </div>
`;

class CustomDropdown extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.open = false; // Estado de dropdown

        this.$label = this._shadowRoot.querySelector('.label');
        this.$button = this._shadowRoot.querySelector('custom-button');
        this.$dropdown = this._shadowRoot.querySelector('.dropdown');
        this.$dropdownList = this._shadowRoot.querySelector('.dropdown-list');

        this.$button.addEventListener(
            'onClick',
            this.toggleOpen.bind(this)
        );
    }

    static get observedAttributes() {
        return ['label', 'option', 'options'];
    }

    get label() {
        return this.getAttribute('label');
    }

    set label(value) {
        this.setAttribute('label', value);
    }

    get option() {
        return this.getAttribute('option');
    }

    set option(value) {
        this.setAttribute('option', value);
    }

    get options() {
        return JSON.parse(this.getAttribute('options'));
    }

    set options(value) {
        this.setAttribute('options', JSON.stringify(value));
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    toggleOpen(event) {
        // Abre el dropdown
        this.open = !this.open;
        return this.open ? this.$dropdown.classList.add('open') : this.$dropdown.classList.remove('open');
    }

    render() {
        this.$label.innerHTML = this.label;
        this.$button.setAttribute('label', 'Seleccionar Item');
        if (this.options) {
            this.$button.setAttribute(
                'label',
                this.options[this.option].label
            );
        }

        this.$dropdownList.innerHTML = '';

        // Por cada item dado en las opciones, creamos un list element
        Object.keys(this.options || {}).forEach(key => {
            let option = this.options[key];
            let $option = document.createElement('li');
            $option.innerHTML = option.label;
            if (this.option && this.option === key) {
                $option.classList.add('selected');
            }
            $option.addEventListener('click', () => {
                // Selecciona la key y se renderea de nuevo (se actualiza)
                this.option = key;
                this.toggleOpen();
                this.dispatchEvent(
                    new CustomEvent('onChange', { detail: key })
                );
                this.render();
            });
            this.$dropdownList.appendChild($option);
        });
    }
}

window.customElements.define('custom-dropdown', CustomDropdown);