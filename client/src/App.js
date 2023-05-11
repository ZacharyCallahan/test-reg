import './App.css';
import React, { useState } from 'react';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);
  return (
    <div className="App">
      <ProductList products={products} setProducts={setProducts} />

    </div>
  );
}

export default App;
