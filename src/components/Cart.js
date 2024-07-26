import React from 'react';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: 
              <input 
                type="number" 
                value={item.quantity} 
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} 
                min="1" 
                max={item.availableQuantity}
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </p>
          </div>
        </div>
      ))}
      <h3>Total Amount: ₹{totalAmount}</h3>
    </div>
  );
};

export default Cart;
