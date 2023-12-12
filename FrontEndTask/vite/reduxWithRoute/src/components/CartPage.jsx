import React, { useState } from 'react';
import { incrementDecrementByAmount } from '../features/quantityChange';
import { useDispatch } from 'react-redux';

const CartPage = ({ product }) => {
  const { title, description, price, stock, brand, category, thumbnail } =
    product;

  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const handleQuantity = (e) => {
    const quantity = e.target.value;
    setQuantity(quantity);
    dispatch(incrementDecrementByAmount(quantity));
  };

  return (
    <div className='product row mt-5'>
      <div className='col-5'>
        <img src={thumbnail} alt='Thumbnail' />
      </div>
      <div className='col-2'>
        <h2>{title}</h2>
        <p>Description: {description}</p>
        <p>Brand: {brand}</p>
        <p>Category: {category}</p>
      </div>

      <div className='col-2'>
        <select
          onChange={(e) => {
            handleQuantity(e);
          }}
        >
          {Array.from({ length: stock + 1 }, (_, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>

        <p>stock :{parseInt(stock) - parseInt(quantity)}</p>
        <p>Total Price: ${price * quantity}</p>
      </div>
    </div>
  );
};

export default CartPage;
