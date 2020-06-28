const template = document.createElement('template');

template.innerHTML = `
    <style>
        .container {
            padding: 8px;
            margin: auto;
            width: 300px;
        }

        button {
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
            margin-top: 6px;
            width: 100%;
            height: 40px;

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
        <button>Label</button>
    </div>
`;

class CustomButton extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: 'open' // Componente accesible
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true)); // Reusable en el HTML
        this.$container = this._shadowRoot.querySelector('.container');
        this.$button = this._shadowRoot.querySelector('button');
        this.$button.addEventListener('click', () => {
            this.dispatchEvent(
                // Dispara un evento hacia el componente padre
                new CustomEvent('onClick', {
                    detail: 'Hola desde el interior de custom-button',
                })
            );
        });
    }

    get label() {
        // Refleja el valor del atributo label mas reciente a la propiedad de la clase
        return this.getAttribute('label');
    }

    set label(value) {
        // Para activar el callback con cambios de un atributo desde el script
        this.setAttribute('label', value);
    }

    get color() {
        // Refleja el valor del atributo color mas reciente a la propiedad de la clase
        return this.getAttribute('color');
    }

    set color(value) {
        // Para activar el callback con cambios de un atributo desde el script
        this.setAttribute('color', value);
    }

    get bgcolor() {
        // Refleja el valor del atributo bgcolor mas reciente a la propiedad de la clase
        return this.getAttribute('bgcolor');
    }

    set bgcolor(value) {
        // Para activar el callback con cambios de un atributo desde el script
        this.setAttribute('bgcolor', value);
    }

    get width() {
        // Refleja el valor del atributo width mas reciente a la propiedad de la clase
        return this.getAttribute('width');
    }

    set width(value) {
        // Para activar el callback con cambios de un atributo desde el script
        this.setAttribute('width', value);
    }

    get height() {
        // Refleja el valor del atributo height mas reciente a la propiedad de la clase
        return this.getAttribute('height');
    }

    set height(value) {
        // Para activar el callback con cambios de un atributo desde el script
        this.setAttribute('height', value);
    }


    static get observedAttributes() {
        // Define los atributos en donde se observan cambios
        return ['label', 'color', 'bgcolor', 'width', 'height'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        // Recibe el cambio del atributo
        this.render();
    }

    connectedCallback() {
        if (this.hasAttribute('as-atom')) {
            this.$container.style.padding = '0px';
        }
    }

    render() {
        this.$button.innerHTML = this.label;
        this.$button.style.backgroundColor = this.bgcolor;
        this.$button.style.color = this.color;
        this.$button.style.width = this.width;
        this.$button.style.height = this.height;
    }
}

window.customElements.define('custom-button', CustomButton);