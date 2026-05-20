import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice'; // Import all actions
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const costValue = parseFloat(item.cost.replace('$', ''));
      total += costValue * item.quantity;
    });
    return total.toFixed(2);
  };

  // Continue Shopping - Return to plant listing page
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // Handle Increment - Use updateQuantity action to increase quantity by 1
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ 
      name: item.name, 
      quantity: item.quantity + 1 
    }));
  };

  // Handle Decrement - Use updateQuantity action to decrease quantity by 1 or remove if quantity becomes 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ 
        name: item.name, 
        quantity: item.quantity - 1 
      }));
    } else {
      // Use removeItem action to delete item completely from cart
      dispatch(removeItem(item.name));
    }
  };

  // Handle Remove - Use removeItem action to delete item completely from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost for an item (subtotal for each plant type)
  const calculateTotalCost = (item) => {
    const costValue = parseFloat(item.cost.replace('$', ''));
    const itemTotal = costValue * item.quantity;
    return itemTotal.toFixed(2);
  };

  // Checkout functionality (for future reference)
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added any plants to your cart yet.</p>
          <button className="get-started-button" onClick={handleContinueShopping}>
            Continue Shopping 🌿
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div className="cart-items-list">
        {cart.map(item => (
          <div className="cart-item" key={item.id || item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              
              <div className="cart-item-quantity">
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              
              <button 
                className="cart-item-delete" 
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
