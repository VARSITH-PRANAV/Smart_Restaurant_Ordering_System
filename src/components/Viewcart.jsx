import React, { useEffect, useState, useContext } from 'react';
import '../components/Viewcart.css';
import { cartContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Viewcart = () => {
  const { cart, setCart, setOrders } = useContext(cartContext);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + (parseInt(curr.amount) * curr.qty), 0));
  }, [cart]);

  const increaseQty = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item => item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    const newOrders = cart.map(item => ({
      ...item,
      timer: 10,
      status: 'Cooking',
      rating: 0,
      feedbackGiven: false,
      accepted: false
    }));

    try {
      // Fetch existing preparing items
      const res = await axios.get('http://localhost:3001/restaurants/jmwgi4bk');
      const existingPreparing = res.data.preparing || [];

      // Add new orders to preparing
      await axios.patch('http://localhost:3001/restaurants/jmwgi4bk', {
        preparing: [...existingPreparing, ...newOrders]
      });

      setOrders(newOrders);  // optional: update context
      setCart([]);           // clear cart
      navigate('/jmwgi4bk/:tableNo/orders/');
    } catch (err) {
      console.error('Failed to place order:', err);
      alert('Failed to place order. Check server or try again.');
    }
  };

  return (
    <>
      {cart.length !== 0 ? (
        <>
          <div className="cart-heading">
            <h1>Cart Products</h1>
            <h1>Total Items: {cart.length}</h1>
          </div>

          <div className="cart-container">
            {cart.map((product) => (
              <div className="cart-product" key={product.id}>
                <div className="img">
                  <img src={product.pic} alt={product.name} />
                </div>
                <div className="cart-product-details">
                  <h3>{product.name}</h3>
                  <p>Price: ₹ {product.amount}</p>
                  <div className="qty-control">
                    <button className="decrease-btn" onClick={() => decreaseQty(product.id)}>-</button>
                    <input type="number" value={product.qty} readOnly />
                    <button className="increase-btn" onClick={() => increaseQty(product.id)}>+</button>
                  </div>
                  <p>Subtotal: ₹ {parseInt(product.amount) * product.qty}</p>
                  <button className='remove-btn' onClick={() => removeFromCart(product.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <h2 className='cart-amt'>Total Amount: ₹ {total}</h2>
            <button className='place-order-btn' onClick={placeOrder}>Place Order</button>
          </div>
        </>
      ) : (
        <div className='empty-cart-container'>
          <div className='empty-cart'>
            <h1>Cart is Empty 😔</h1>
          </div>
        </div>
      )}
    </>
  );
};
