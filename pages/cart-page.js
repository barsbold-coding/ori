export default class CartPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
    this.renderCartItems();
  }

  renderCartItems() {
    const emptyCart = `
      <div id="empty-cart" class="empty-cart hidden">
        <div class="empty-cart-animation">
          <div class="coffee-cup empty"></div>
          <div class="coffee-drop"></div>
        </div>
        <h3>Your cart is empty</h3>
        <p>Add some delicious coffee to your cart!</p>
        <button id="browse-menu-btn" class="primary-btn">Browse Menu</button>
      </div>
      `;
    const cart = this.shadowRoot.getElementById("cart-items")
    const cartData = window.cartService.getCart();
    console.log(cartData);
    cartData.forEach(el => {
      const item = document.createElement('item-card');
      item.setAttribute('id', el.id);
      item.setAttribute('name', el.name);
      item.setAttribute('price', el.price);
      item.setAttribute('img', el.image);
      cart.appendChild(item)
    })
  }

  styleSheet = `
  <style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    body {
        background-color: #f5f0e8;
        color: #4a3520;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

    .hidden {
        display: none !important;
    }


    header {
        background-color: #6f4e37;
        color: #fff;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    header h1 {
        font-size: 1.5rem;
    }

    .header-placeholder {
        width: 80px;
    }


    button {
        cursor: pointer;
        background-color: #d4a574;
        color: #4a3520;
        border: none;
        padding: 10px 20px;
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

    .primary-btn {
        background-color: #6f4e37;
        color: #fff;
        padding: 12px 24px;
        font-size: 16px;
        font-weight: bold;
    }

    h2 {
        color: #6f4e37;
        margin: 30px 0 20px;
        font-size: 1.8rem;
    }

    .cart-items {
        background-color: #fff;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        margin-bottom: 30px;
    }

    .cart-item {
        display: flex;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #e9e1d9;
    }

    .cart-item:last-child {
        border-bottom: none;
    }

    .item-image {
        width: 80px;
        height: 80px;
        border-radius: 10px;
        overflow: hidden;
        margin-right: 20px;
    }

    .item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .item-details {
        flex: 1;
    }

    .item-name {
        font-weight: bold;
        font-size: 1.1rem;
        color: #6f4e37;
        margin-bottom: 5px;
    }

    .item-size {
        font-size: 0.9rem;
        color: #8b5a2b;
        margin-bottom: 5px;
    }

    .item-options {
        font-size: 0.8rem;
        color: #8b5a2b;
    }

    .item-quantity {
        font-weight: bold;
        margin: 0 20px;
    }

    .item-price {
        font-weight: bold;
        font-size: 1.1rem;
        color: #6f4e37;
        margin-right: 15px;
    }

    .remove-btn {
        background-color: #ff6b6b;
        color: #fff;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        font-size: 18px;
    }

    /* Empty Cart */
    .empty-cart {
        text-align: center;
        padding: 40px 20px;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        margin-bottom: 30px;
    }

    .empty-cart h3 {
        font-size: 1.5rem;
        color: #6f4e37;
        margin-bottom: 10px;
    }

    .empty-cart p {
        color: #8b5a2b;
        margin-bottom: 20px;
    }

    .empty-cart-animation {
        position: relative;
        width: 150px;
        height: 180px;
        margin: 0 auto 30px;
    }

    .coffee-cup {
        position: absolute;
        width: 100px;
        height: 120px;
        background-color: #fff;
        border: 3px solid #6f4e37;
        border-radius: 0 0 50px 50px;
        left: 25px;
    }

    .coffee-cup.empty::after {
        content: "";
        position: absolute;
        width: 40px;
        height: 40px;
        border: 3px solid #6f4e37;
        border-left: 0;
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
        right: -20px;
        top: 30px;
    }

    .coffee-drop {
        position: absolute;
        width: 20px;
        height: 20px;
        background-color: #6f4e37;
        border-radius: 50% 50% 0 50%;
        transform: rotate(-45deg);
        top: 150px;
        left: 65px;
        animation: dropFall 2s ease-in-out infinite;
    }

    @keyframes dropFall {
        0% {
            transform: rotate(-45deg) translateY(-60px);
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            transform: rotate(-45deg) translateY(0);
            opacity: 0;
        }
    }

    /* Cart Summary */
    .cart-summary {
        background-color: #fff;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .summary-row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #e9e1d9;
    }

    .summary-row.total {
        border-bottom: none;
        margin-top: 5px;
        font-size: 1.2rem;
        font-weight: bold;
        color: #6f4e37;
    }

    .checkout-section {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #e9e1d9;
    }

    @media (max-width: 768px) {
        .cart-item {
            flex-direction: column;
            align-items: flex-start;
        }
        
        .item-image {
            margin-bottom: 15px;
        }
        
        .item-price-actions {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
        }
        
        .checkout-section {
            flex-direction: column;
            gap: 15px;
        }
        
        #checkout-btn, #clear-cart-btn {
            width: 100%;
        }
    }
  </style>
  `

  render() {
    this.shadowRoot.innerHTML = `
    ${this.styleSheet}
    <div class="container">
        <h2>Your Cart</h2>
        
        <div id="cart-items" class="cart-items">
        </div>
        
        
        <div id="cart-summary" class="cart-summary">
            <div class="summary-row">
                <span>Subtotal</span>
                <span id="subtotal">$0.00</span>
            </div>
            <div class="summary-row">
                <span>Tax (8%)</span>
                <span id="tax">$0.00</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span id="total">$0.00</span>
            </div>
            
            <div class="checkout-section">
                <button id="clear-cart-btn">Clear Cart</button>
                <button id="checkout-btn" class="primary-btn">Proceed to Payment</button>
            </div>
        </div>
    </div>
    `;
  }
}

customElements.define('cart-page', CartPage);
