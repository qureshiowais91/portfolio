import React, { useContext } from 'react';
import Product from './product'; // Import your Product component here
import CartContext from '../../Context';

const List = () => {
    const { products, addToCart } = useContext(CartContext);

    return (
        <div className="container">
            <div className="row">
                {products.map(product => (
                    <div className="col-6" key={product.id}>
                        <Product product={product} addToCart={addToCart} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;