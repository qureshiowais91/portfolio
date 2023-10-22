import React, { useContext } from 'react';
import CartContext from '../../Context'; // Import your CartContext here

const Cart = () => {
    const { cart, removeFromCart, quantityChange } = useContext(CartContext);
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    return (
        <div className="container">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="list-group mt-3">
                        {cart.map((item) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                                <div className="d-flex align-items-center">
                                    <img src={item.thumbnail} alt={item.title} className="me-3" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    <span>{item.title}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="me-2">Quantity:</span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.qty}
                                        onChange={(e) => quantityChange(item.id, parseInt(e.target.value))}
                                        className="form-control"
                                        style={{ width: '70px' }}
                                    />
                                </div>
                                <span>Price: ${item.price * item.qty}</span>
                                <button className="rounded-pill" onClick={() => { removeFromCart(item.id) }}>
                                    Remove From Cart
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3">
                        <h4>Total: ${total.toFixed(2)}</h4>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
