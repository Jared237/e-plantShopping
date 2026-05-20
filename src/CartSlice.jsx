import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    // Add item to cart - Called when user clicks "Add to Cart"
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details from the action payload
      
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.quantity++;
        // Update total price for this item
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        // Convert cost string to number (e.g., "$15" to 15)
        const priceValue = parseFloat(cost.replace('$', ''));
        
        state.items.push({ 
          name, 
          image, 
          cost, // Keep original cost string for display
          price: priceValue, // Store numeric price for calculations
          quantity: 1,
          totalPrice: priceValue,
          id: Date.now(), // Unique ID for React keys
        });
      }
      
      // Update total quantity and total amount
      state.totalQuantity += 1;
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // Remove item from cart - Called when user clicks "Delete"
    removeItem: (state, action) => {
      // Remove item based on its name
      const itemName = action.payload;
      const existingItem = state.items.find(item => item.name === itemName);
      
      if (existingItem) {
        // Subtract the item's quantity and total price from totals
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        // Filter out the item from the items array
        state.items = state.items.filter(item => item.name !== itemName);
      }
    },
    
    // Update quantity - Called when user clicks +/- buttons
    updateQuantity: (state, action) => {
      // Destructure the product name and new quantity from the action payload
      const { name, quantity } = action.payload;
      
      // Find the item in the cart that matches the given name
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        // Calculate the difference in quantity
        const quantityDifference = quantity - itemToUpdate.quantity;
        
        // Update the item's quantity to the new value
        itemToUpdate.quantity = quantity;
        
        // Update the total price for this item
        itemToUpdate.totalPrice = itemToUpdate.price * quantity;
        
        // Update global totals
        state.totalQuantity += quantityDifference;
        state.totalAmount += itemToUpdate.price * quantityDifference;
      }
    },
    
    // Clear entire cart (Bonus feature for checkout)
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

// Export all action creators to use in components
export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

// Export the reducer as default to use in store.js
export default CartSlice.reducer;
