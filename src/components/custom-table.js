import './custom-button.js';
import '@vaadin/vaadin-grid';

const template = document.createElement('template');

template.innerHTML = `
    <style>
        .container {
            padding: 8px;
            margin: 0px 100px;
        }

        .box {
            display: inline-block;
            overflow: hidden;
            position: relative;
            padding: 10px 0px 40px 0px;
            margin: 0px 30px;
            font-size: 16px;
            font-weight: bold;
            text-overflow: ellipsis;
            white-space: nowrap;
            outline: none;
            width: 400px;
            box-sizing: border-box;
            border: 0px solid #a1a1a1;
            border-radius: 5px;
            background: #ffffff;
            box-shadow: 0 10px 8px 0 rgba(0,0,0, 0.15), 0 2px 8px 0 rgba(161,161,161, 0.4);
            color: #363636;
        }
        
        .table-box {
            display: inline-block;
            position: relative;
            padding: 0px 16px 0px 16px;
            margin: 0px 0px 0px 0px;
            width: 700px;
            height: 500px;
            font-size: 16px;
            font-weight: bold;
            text-overflow: ellipsis;
            outline: none;
            box-sizing: border-box;
            box-shadow: 0 10px 8px 0 rgba(0,0,0, 0.15), 0 2px 8px 0 rgba(161,161,161, 0.4);
            border-radius: 5px;
            background: #ffffff;
            color: #363636;
        }

        .input-box input {
            border-radius: 10px;
            border: 1px solid grey;
            width: 250px;
            padding: 8px;
            margin: 5px;
        }

        h1 {
            font-size: 28px;
        }


    </style>
    
    <div class="container">
        <div class="form box">
            <h1>Menu</h1>
        </div>
        <vaadin-grid id="grid" class="table-box">
        </vaadin-grid>
    </div>
`;

class CustomTable extends HTMLElement {
    constructor() {
        super();

        this._shadowRoot = this.attachShadow({
            mode: 'open' // Componente accesible
        });
        this._shadowRoot.appendChild(template.content.cloneNode(true)); // Reusable en el HTML
        this.$container = this._shadowRoot.querySelector('.container');
        this.$grid = this._shadowRoot.querySelector('#grid');
        this.$form = this._shadowRoot.querySelector('.form');
        this.inputRefs = [];
        this.rows = [];

        if (this.menu === "true") {
            for (let i = 0; i < this.cols.length; i++) {
                const inputNode = document.createElement('input');
                const gridColNode = document.createElement('vaadin-grid-column');
                const divNode = document.createElement('div');
                const lowerCase = this.cols[i].replace("/ /g", "").toLowerCase();

                divNode.setAttribute('class', 'input-box');

                inputNode.setAttribute('type', 'text');
                inputNode.setAttribute('name', lowerCase);
                inputNode.setAttribute('placeholder', this.cols[i]);
                inputNode.setAttribute('id', lowerCase);

                gridColNode.setAttribute('path', lowerCase);
                gridColNode.setAttribute('header', this.cols[i]);
                this.$grid.appendChild(gridColNode);

                divNode.appendChild(inputNode);

                this.inputRefs.push(inputNode);
                this.$form.appendChild(divNode);
            }

            const addButtonNode = document.createElement('custom-button');
            const removeButtonNode = document.createElement('custom-button');
            const br = document.createElement('br');
            addButtonNode.setAttribute('label', 'Agregar');
            addButtonNode.setAttribute('id', 'add-button');
            removeButtonNode.setAttribute('label', 'Eliminar');
            removeButtonNode.setAttribute('id', 'add-button');
            removeButtonNode.setAttribute('bgcolor', '#ff5e45');
            removeButtonNode.setAttribute('color', 'white');

            this.$form.appendChild(br);
            this.$form.appendChild(addButtonNode);
            this.$form.appendChild(removeButtonNode);

            this.configButtons(addButtonNode, removeButtonNode);
            this.loadData();
        } else {
            for (let i = 0; i < this.cols.length; i++) {
                const gridColNode = document.createElement('vaadin-grid-column');
                const lowerCase = this.cols[i].replace("/ /g", "").toLowerCase();
                gridColNode.setAttribute('path', lowerCase);
                gridColNode.setAttribute('header', this.cols[i]);
                this.$grid.appendChild(gridColNode);
            }
            this.loadData();
            this.$container.removeChild(this.$form);
        }
    }

    get cols() {
        return JSON.parse(this.getAttribute('cols'));
    }

    set cols(value) {
        this.setAttribute('cols', value);
    }

    get data() {
        return JSON.parse(this.getAttribute('data'));
    }

    set data(value) {
        this.setAttribute('data', value);
    }

    get width() {
        return this.getAttribute('width');
    }

    set width(value) {
        this.setAttribute('width', value);
    }

    get height() {
        return this.getAttribute('height');
    }

    set height(value) {
        this.setAttribute('height', value);
    }

    get menu() {
        return this.getAttribute('menu');
    }

    set menu(value) {
        this.setAttribute('menu', value);
    }

    static get observedAttributes() {
        return ['width', 'height', 'cols', 'data', 'menu'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();
    }

    loadData() {
        if (this.data != null) {
            for (let i = 0; i < this.data.length; i++) {
                let newItem = {};
                for (let j = 0; j < this.cols.length; j++) {
                    const lowerCase = this.cols[j].replace("/ /g", "").toLowerCase();
                    newItem[lowerCase] = this.data[i][j];
                }
                this.rows = [
                    ...this.rows,
                    newItem
                ];
            }
            this.render();
        }
    }

    configButtons(addButtoneElem, removeButtonElem) {
        addButtoneElem.addEventListener('click', e => {
            let newItem = {};
            this.inputRefs.forEach(elem => {
                const key = elem.getAttribute('id');
                const value = elem.value;
                newItem[key] = value;
                elem.value = '';
            });
            this.rows = [
                ...this.rows,
                newItem
            ];
            this.render();
        });
        removeButtonElem.addEventListener('click', e => {
            let matchedRow = null;
            let newRows = [];
            this.rows.forEach(elem => {
                let colNum = this.inputRefs.length;
                let found = true;
                for (let i = 0; i < colNum; i++) {
                    if (elem[this.inputRefs[i].getAttribute('id')] !== this.inputRefs[i].value) {
                        found = false;
                    }
                }
                if (!found) {
                    newRows.push(elem);
                }
            });
            this.rows = newRows;
            this.render();
        });
    }

    render() {
        this.$grid.style.width = this.width;
        this.$grid.style.height = this.height;
        this.$form.style.height = this.height;
        this.$grid.items = this.rows;
    }
}

window.customElements.define('custom-table', CustomTable);