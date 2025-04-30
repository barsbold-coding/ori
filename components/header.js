export default class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
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

      .logo-container {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
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

      #branch-selector {
          background-color: #fff;
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

      .logo {
          height: 50px;
          margin-right: 10px;
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


      .header-buttons button:hover,
      #branch-selector:hover {
          background-color: #8b5a3c;
      }
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
    </style>
    <header>
        <a href="/" data-link class="logo-container">
            <img src="/images/coffee-logo.png" alt="CoffeeHustlers Logo" class="logo">
            <h1>CoffeeHustlers</h1>
        </a>
        <div class="header-buttons">
            <div class="right-buttons">
                <button id="history-btn"><i class="fas fa-history"></i> Order History</button>
                <button id="cart-btn"><i class="fas fa-shopping-cart"></i> Cart <span id="cart-count">0</span></button>
                <button id="account-btn"><i class="fas fa-user"></i> Account</button>
            </div>
        </div>
    </header>
    `;
  }
}

customElements.define('nav-bar', Header);
