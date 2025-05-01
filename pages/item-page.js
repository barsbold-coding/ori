export default class ItemPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.data = {};
  }

  async fetchData() {
    const res = await fetch("../data/items.json");
    const data = await res.json();
    const { id } = this.routeParams;
    data.forEach(el => {
      if (el.id === +id) this.data = el;
    })
    this.render();
  }
  onDataFetched() {

  }

  setupEventlisteners() {
    const addToCartBtn = this.shadowRoot.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
      console.log(addToCartBtn)
      addToCartBtn.addEventListener('click', () => {
        window.cartSerivce.addItem({
          ...this.data,
          quantity: 1,
        })
      })
    }
  }

  connectedCallback() {
    this.fetchData();
    this.setupEventlisteners();
  }

  styleSheet = `
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

        #back-btn {
            background-color: transparent;
            color: #fff;
            padding: 5px 10px;
        }

        #cart-btn {
            position: relative;
        }

        #cart-count {
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: #ff6b6b;
            color: #fff;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        }

        .primary-btn {
            background-color: #6f4e37;
            color: #fff;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: bold;
            border-radius: 25px;
            width: 100%;
            margin-top: 20px;
        }


        .item-details {
            background-color: #fff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            margin-top: 30px;
            display: flex;
            flex-direction: column;
        }

        @media (min-width: 768px) {
            .item-details {
                flex-direction: row;
                height: auto;
            }
        }


        .item-image {
            flex: 1;
            position: relative;
            min-height: 250px;
        }

        .item-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .steam-effect {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
        }

        .steam {
            position: absolute;
            height: 100px;
            width: 10px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            transform-origin: bottom;
        }

        .steam-1 {
            left: -15px;
            animation: steam 4s ease-out infinite;
            opacity: 0;
        }

        .steam-2 {
            animation: steam 4s ease-out 1s infinite;
            opacity: 0;
        }

        .steam-3 {
            left: 15px;
            animation: steam 4s ease-out 2s infinite;
            opacity: 0;
        }

        @keyframes steam {
            0% {
                transform: scaleY(0) translateY(0);
                opacity: 0;
            }
            15% {
                opacity: 1;
            }
            50% {
                transform: scaleY(1) translateY(-100px);
            }
            95% {
                opacity: 0;
            }
            100% {
                transform: scaleY(1) translateY(-120px);
                opacity: 0;
            }
        }

        .item-info {
            flex: 1;
            padding: 30px;
        }

        .item-info h2 {
            font-size: 2rem;
            color: #6f4e37;
            margin-bottom: 10px;
        }

        .item-info .price {
            font-size: 1.5rem;
            font-weight: bold;
            color: #8b5a2b;
            margin: 15px 0;
        }

        .item-info p {
            color: #6f4e37;
            margin-bottom: 20px;
            line-height: 1.6;
        }


        .size-selection, .options, .quantity, .total {
            margin-bottom: 25px;
        }

        .size-selection h3, .options h3, .quantity h3, .total h3 {
            margin-bottom: 10px;
            color: #4a3520;
        }

        .size-options {
            display: flex;
            gap: 10px;
        }

        .size-btn {
            flex: 1;
            text-align: center;
            background-color: #e9e1d9;
        }

        .size-btn.active {
            background-color: #6f4e37;
            color: #fff;
        }


        .option-group {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .option-checkbox {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
        }

        .price-add {
            margin-left: auto;
            color: #8b5a2b;
            font-size: 0.9rem;
        }


        .quantity-selector {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .quantity-selector button {
            width: 40px;
            height: 40px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 18px;
            font-weight: bold;
        }

        #quantity-input {
            width: 50px;
            height: 40px;
            text-align: center;
            border: 2px solid #e9e1d9;
            border-radius: 20px;
            font-size: 16px;
        }


        .total {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 0;
            border-top: 2px dashed #e9e1d9;
        }

        .total p {
            font-size: 1.5rem;
            font-weight: bold;
            color: #6f4e37;
            margin: 0;
        }


        @media (max-width: 768px) {
            .item-image {
                height: 250px;
            }
            
            .size-options {
                flex-direction: column;
            }
        }
      </style>
  `
  
  render() {
    this.shadowRoot.innerHTML = `
      ${this.styleSheet}
      <div class="container">
          <div class="item-details">
              <div class="item-image">
                  <img
                    id="item-img"
                    src="/${this.data.image}"
                    alt="Coffee"
                  >
                  <div class="steam-effect">
                      <div class="steam steam-1"></div>
                      <div class="steam steam-2"></div>
                      <div class="steam steam-3"></div>
                  </div>
              </div>
              
              <div class="item-info">
                  <h2 id="item-name">${this.data.name}</h2>
                  <p id="item-description">
                    Rich espresso balanced with steamed milk and a light layer of foam.
                  </p>
                  <p id="item-price" class="price">$${this.data.price}</p>
                  
                  <div class="size-selection">
                      <h3>Size</h3>
                      <div class="size-options">
                          <button
                            class="size-btn active"
                            data-size="small"
                            data-price="0"
                          >Small</button>
                          <button
                            class="size-btn"
                            data-size="medium"
                            data-price="0.50"
                          >Medium</button>
                          <button
                            class="size-btn"
                            data-size="large"
                            data-price="1.00"
                          >Large</button>
                      </div>
                  </div>
                  
                  <div class="options">
                      <h3>Options</h3>
                      <div class="option-group">
                          <label class="option-checkbox">
                              <input type="checkbox" name="extra-shot" data-price="0.80">
                              Extra Shot
                              <span class="price-add">+$0.80</span>
                          </label>
                          
                          <label class="option-checkbox">
                              <input type="checkbox" name="extra-cream" data-price="0.50">
                              Extra Cream
                              <span class="price-add">+$0.50</span>
                          </label>
                          
                          <label class="option-checkbox">
                              <input type="checkbox" name="vanilla-syrup" data-price="0.75">
                              Vanilla Syrup
                              <span class="price-add">+$0.75</span>
                          </label>
                      </div>
                  </div>
                  
                  <div class="quantity">
                      <h3>Quantity</h3>
                      <div class="quantity-selector">
                          <button id="decrease-btn">-</button>
                          <input type="number" id="quantity-input" value="1" min="1" max="10">
                          <button id="increase-btn">+</button>
                      </div>
                  </div>
                  
                  <div class="total">
                      <h3>Total</h3>
                      <p id="total-price">$4.29</p>
                  </div>
                  
                  <button id="add-to-cart-btn" class="primary-btn">Add to Cart</button>
              </div>
          </div>
    `
  }
}

customElements.define('item-page', ItemPage);
