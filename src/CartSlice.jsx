import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    // Add item to cart - addItem action
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      const priceValue = parseFloat(cost.replace('$', ''));
      
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({ 
          name, 
          image, 
          cost,
          price: priceValue,
          quantity: 1,
          totalPrice: priceValue,
          id: Date.now(),
        });
      }
      
      state.totalQuantity += 1;
      state.totalAmount = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // Remove item from cart - removeItem action
    removeItem: (state, action) => {
      const itemName = action.payload;
      const existingItem = state.items.find(item => item.name === itemName);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.name !== itemName);
      }
    },
    
    // Update quantity - updateQuantity action
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        const quantityDifference = quantity - itemToUpdate.quantity;
        itemToUpdate.quantity = quantity;
        itemToUpdate.totalPrice = itemToUpdate.price * quantity;
        state.totalQuantity += quantityDifference;
        state.totalAmount += itemToUpdate.price * quantityDifference;
      }
    },
    
    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

// Export all action creators
export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
