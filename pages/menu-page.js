export default class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.tab = "hot";
    this.data = [];
    this.render();
  }

  async fetchData() {
    const res = await fetch("../data/items.json");
    this.data = await res.json();

    this.render();
  }

  onTabChange(tab) {
    this.tab = tab;
    this.render();
  }

  connectedCallback() {
    this.fetchData();
    const categoryBtn = this.shadowRoot.querySelector("menu-categories");
    categoryBtn.addEventListener('change-tab', (e) => console.log(e));
    console.log(categoryBtn);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            min-height: 100vh;
        }

        .hidden {
            display: none !important;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background-color: #f5f5f5;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        header h1 {
            margin: 0;
            color: #6b4226;
        }

        .header-buttons {
            display: flex;
            gap: 15px;
        }

        .right-buttons {
            display: flex;
            gap: 10px;
        }

        .header-buttons button,
        #branch-selector {
            background-color: #fff;
            color: #4a3520;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 8px 12px;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            cursor: pointer;
            appearance: none; 
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

        .menu-categories {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 30px 0;
            flex-wrap: wrap;
        }

        .category-btn {
            background-color: #e9e1d9;
            color: #6f4e37;
            padding: 10px 20px;
            border-radius: 25px;
        }

        .category-btn.active {
            background-color: #6f4e37;
            color: #fff;
        }

        /* Menu Items */
        .menu-section {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 25px;
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
            .header-buttons {
                flex-direction: column;
                gap: 15px;
            }
            
            .right-buttons {
                width: 100%;
                justify-content: space-between;
            }
            
            .menu-section {
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            }
        }

        @media (max-width: 480px) {
            .menu-categories {
                flex-direction: column;
                align-items: center;
            }
            
            .category-btn {
                width: 80%;
            }
            
            .menu-section {
                grid-template-columns: 1fr;
            }
        }
      </style>
      <div class="container">
      <menu-categories></menu-categories>

        <div class="menu-items">
          <div class="menu-section" id="hot">
            ${
              this.data.filter(el => el.type === this.tab).map(el => `
                  <item-card
                    img="${el.image}"
                    name="${el.name}"
                    price="${el.price}"
                  ></item-card>
                `).join("")
            }
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('menu-page', MenuPage);
