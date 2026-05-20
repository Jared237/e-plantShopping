import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Import removeItem and updateQuantity
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return totalAmount.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // Handle increment - updates quantity to current + 1
  const handleIncrement = (item) => {
    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ 
      name: item.name, 
      quantity: newQuantity 
    }));
  };

  // Handle decrement - updates quantity to current - 1
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      dispatch(updateQuantity({ 
        name: item.name, 
        quantity: newQuantity 
      }));
    } else {
      // If quantity is 1, remove the item when decrement is clicked
      handleRemove(item);
    }
  };

  // Handle remove - removes item from cart completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const handleCheckout = () => {
    const finalTotal = calculateTotalAmount();
    alert(`Thank you for your purchase!\n\nTotal Amount: $${finalTotal}\n\nYour plants will be delivered within 3-5 business days. 🌿`);
    // Optionally dispatch clearCart here if you have it
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
      
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
        <div className="cart-summary">
          <div className="summary-row">
            <span>Total Items:</span>
            <span><strong>{totalQuantity}</strong></span>
          </div>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span><strong>${calculateTotalAmount()}</strong></span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span><strong>{parseFloat(calculateTotalAmount()) > 50 ? 'Free' : '$5.99'}</strong></span>
          </div>
          <div className="summary-row total">
            <span>Grand Total:</span>
            <span><strong>
              ${(parseFloat(calculateTotalAmount()) + (parseFloat(calculateTotalAmount()) > 50 ? 0 : 5.99)).toFixed(2)}
            </strong></span>
          </div>
        </div>
      </div>
      
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
