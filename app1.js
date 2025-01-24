import React, { useState } from 'react';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import CurrencySelector from './components/CurrencySelector';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartProvider>
      <div className="App">
        <header className="App-header">
          <h1>Online Store</h1>
          <button onClick={toggleCart} className="cart-button">Ver carrito</button>
        </header>
        <CurrencySelector />
        <ProductList />
        {isCartOpen && <CartSidebar onClose={toggleCart} />}
      </div>
    </CartProvider>
  );
}

export default App;