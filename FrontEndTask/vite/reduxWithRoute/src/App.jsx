import React from 'react';
import CartPage from './components/CartPage';

const App = () => {
  const productModel = {
    id: 1,
    title: 'iPhone 9',
    description: 'An apple mobile which is nothing like apple',
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
  };

  return (
    <div className='container'>
      <CartPage product={productModel} />
    </div>
  );
};

export default App;
