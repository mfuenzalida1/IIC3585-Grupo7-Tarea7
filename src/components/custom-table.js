import './custom-button.js';

const template = document.createElement('template');

template.innerHTML = `
    <style>
        .container {
            display: block;
            padding: 8px;
            margin: 0px auto;
        }

        .box {
            display: inline-table;
            position: relative;
            padding: auto;
            margin: auto 30px;
            font-size: 16px;
            font-weight: bold;
            width: 400px;
            height: 100%;
            border: 0px solid #a1a1a1;
            border-radius: 10px;
            background: #ffffff;
            box-shadow: 0 10px 8px 0 rgba(0,0,0, 0.15), 0 2px 8px 0 rgba(161,161,161, 0.4);
            color: #363636;
        }
        
        .table-box {
            display: inline-table;
            position: relative;
            padding: 0px 16px 16px 16px;
            margin: auto 0px 16px auto;
            width: 700px;
            font-size: 16px;
            font-weight: bold;
            outline: none;
            box-shadow: 0 10px 8px 0 rgba(0,0,0, 0.15), 0 2px 8px 0 rgba(161,161,161, 0.4);
            border-radius: 10px;
            background: #ffffff;
            color: #363636;
            border-spacing: 0;
            border-collapse: 0;
        }

        .table-box th {
            padding: 16px;
            margin-bottom: 20px;
        }

        .header-col {
            border-bottom: solid #d4d4d4;
            border-width: 1px 0;
            font-size: 26px;
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
        <table id="grid" class="table-box">
        </table>
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
        this.headerCols = [];
        this.rows = [];

        if (this.menu === "true") {
            for (let i = 0; i < this.cols.length; i++) {
                const inputNode = document.createElement('input');
                const gridColNode = document.createElement('th');
                const divNode = document.createElement('div');
                const lowerCase = this.cols[i].replace("/ /g", "").toLowerCase();

                // Table
                gridColNode.innerHTML = this.cols[i];
                gridColNode.setAttribute('class', 'header-col');
                this.headerCols.push(gridColNode);

                // Menu
                inputNode.setAttribute('type', 'text');
                inputNode.setAttribute('name', lowerCase);
                inputNode.setAttribute('placeholder', this.cols[i]);
                inputNode.setAttribute('id', lowerCase);
                divNode.setAttribute('class', 'input-box');
                divNode.appendChild(inputNode);
                this.inputRefs.push(inputNode);
                this.$form.appendChild(divNode);
            }

            const gridRowNode = document.createElement('tr');
            this.headerCols.forEach(node => {
                gridRowNode.appendChild(node);
            });
            this.$grid.appendChild(gridRowNode);

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
                const gridColNode = document.createElement('th');
                gridColNode.innerHTML = this.cols[i];
                gridColNode.setAttribute('class', 'header-col');
                this.headerCols.push(gridColNode);
            }
            const gridRowNode = document.createElement('tr');
            this.headerCols.forEach(node => {
                gridRowNode.appendChild(node);
            });
            this.$grid.appendChild(gridRowNode);
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

    refreshTable() {
        this.$grid.innerHTML = "";
        const headerRow = document.createElement('tr');
        this.headerCols.forEach(node => {
            headerRow.appendChild(node);
        });
        this.$grid.appendChild(headerRow);
        this.rows.forEach(rowObj => {
            const row = document.createElement('tr');
            for (let key in rowObj) {
                let value = document.createElement('th');
                value.innerHTML = rowObj[key];
                row.appendChild(value);
            }
            this.$grid.appendChild(row);
        });
    }

    findRow(values) {

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
            let empty = false;
            this.inputRefs.forEach(elem => {
                const key = elem.getAttribute('id');
                const value = elem.value;
                if (value === "") {
                    empty = true;
                }
                newItem[key] = value;
            });
            if (!empty) {
                let isInTable = false;
                for (let num in this.rows) {
                    let found = true;
                    let colNum = this.inputRefs.length;
                    for (let i = 0; i < colNum; i++) {
                        if (this.rows[num][this.inputRefs[i].getAttribute('id')] != newItem[this.inputRefs[i].getAttribute('id')]) {
                            found = false;
                        }
                    }
                    if (found) {
                        isInTable = true;
                        break;
                    }
                }
                if (!isInTable) {
                    this.rows = [
                        ...this.rows,
                        newItem
                    ];
                } else {
                    alert("El elemento ya se encuentra en la tabla.");
                }
                this.render();
            } else {
                alert("Debe rellenar todos los campos.");
            }
        });
        removeButtonElem.addEventListener('click', e => {
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
            if (newRows.length === this.rows.length) {
                alert("No se encontró el elemento en la tabla.");
            }
            this.rows = newRows;
            this.render();
        });
    }

    render() {
        this.$grid.style.width = this.width;
        this.$grid.style.height = this.height;
        this.$form.style.height = this.height;
        this.refreshTable();
    }
}

window.customElements.define('custom-table', CustomTable);