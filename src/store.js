// src/index.js or src/store.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './index.css';
import App from './App';
import cartReducer from './components/CartSlice';

// Configure the store with cart reducer
const store = configureStore({
  reducer: {
    cart: cartReducer, // Export the reducer as default to use in store
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
