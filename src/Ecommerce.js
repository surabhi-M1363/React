import React, { useState } from 'react';
import './Ecommerce.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [products] = useState([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('catalog');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setError('');
    setCart([]);
    setCurrentPage('catalog');
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="app-container">
      {isLoggedIn ? (
        currentPage === 'catalog' ? (
          <div className="catalog-container">
            <h2>WELCOME to The Cart, {username || 'User'}!</h2>
            <p>You are now logged in.</p>
            <div className="product-list">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <h3>{product.name}</h3>
                  <p>Price: {product.price}</p>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              ))}
            </div>
            <button onClick={() => setCurrentPage('cart')}>View Cart</button>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : currentPage === 'cart' ? (
          <div className="cart-container">
            <h3>Shopping Cart</h3>
            {cart.length > 0 ? (
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.price}
                    <button onClick={() => removeFromCart(index)}>Remove</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your cart is empty.</p>
            )}
            <p>Total: {total}</p>
            <button onClick={() => setCurrentPage('payment')}>Proceed to Payment</button>
            <button onClick={() => setCurrentPage('catalog')}>Back to Catalog</button>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="payment-container">
            <h3>Payment Page</h3>
            <p>Total Amount: {total}</p>
            <button onClick={() => alert('Payment Successful!')}>Pay Now</button>
            <button onClick={() => setCurrentPage('cart')}>Back to Cart</button>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        )
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="login-button">Login</button>
        </form>
      )}
    </div>
  );
}

export default App;
