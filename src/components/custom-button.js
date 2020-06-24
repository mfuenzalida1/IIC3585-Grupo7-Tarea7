const template = document.createElement('template');

template.innerHTML = `
    <style>
        .container {
            padding: 8px;
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

            width: 100%;
            height: 40px;

            box-sizing: border-box;
            border: 1px solid #a1a1a1;
            background: #ffffff;
            box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
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

    static get observedAttributes() {
        // Define los atributos en donde se observan cambios
        return ['label'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        // Recibe el cambio del atributo
        this.render();
    }

    render() {
        this.$button.innerHTML = this.label;
    }
}

window.customElements.define('custom-button', CustomButton);