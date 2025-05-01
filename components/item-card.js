export default class ItemCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        a {
          text-decoration: none;
        }
        button {
            cursor: pointer;
            background-color: #d4a574;
            color: #4a3520;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            transition: all 0.3s ease;
        }

        button:hover {
            background-color: #c69c6d;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .menu-item {
            background-color: #fff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
            cursor: pointer;
        }

        .menu-item:hover {
            transform: translateY(-5px);
        }

        .menu-item img {
            width: 100%;
            height: auto;
            object-fit: contain;
            aspect-ratio: 4 / 3; 
            padding: 10px;
        }


        .item-details {
            padding: 15px;
        }

        .item-details h3 {
            margin-bottom: 5px;
            color: #6f4e37;
        }

        .item-details p {
            color: #8b5a2b;
            font-weight: bold;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .menu-section {
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            }
        }

        @media (max-width: 480px) {
            .menu-section {
                grid-template-columns: 1fr;
            }
        }
      </style>
      <a data-link href="/item/${this.getAttribute("id")}">
        <div style="width:250px" class="menu-item" data-id="1">
            <img src="${this.getAttribute('img')}" alt="Espresso">
            <div class="item-details">
                <h3>${this.getAttribute('name')}</h3>
                <p>$${this.getAttribute('price')}</p>
            </div>
        </div>
      </a>
    `
  }
}

customElements.define('item-card', ItemCard);
