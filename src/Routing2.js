import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from 'react-router-dom';
import './Routing2.css';

function HomePage() {
  return <div className="page"><h1>Home</h1><p>Welcome to the home page.</p></div>;
}

function ProductPage() {
  const { productId } = useParams();
  return (
    <div className="page">
      <h1>Product: {productId}</h1>
      <p>Details for product {productId}.</p>
    </div>
  );
}

function AboutPage() {
  return <div className="page"><h1>About</h1><p>Learn more about us.</p></div>;
}

function NotFoundPage() {
  return <div className="page"><h1>404 Not Found</h1><p>Page not found.</p></div>;
}

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/product/123" className="nav-link">Product 123</Link>
          <Link to="/product/456" className="nav-link">Product 456</Link>
          <Link to="/about" className="nav-link">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;