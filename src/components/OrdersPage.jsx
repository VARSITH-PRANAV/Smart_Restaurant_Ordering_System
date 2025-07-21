import React, { useEffect, useState } from 'react';
import '../components/OrdersPage.css';
import axios from 'axios';

export const OrdersPage = () => {
  const [preparingItems, setPreparingItems] = useState([]);
  const [deliveredItems, setDeliveredItems] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3001/restaurants/jmwgi4bk');
      setPreparingItems(res.data.preparing || []);
      setDeliveredItems(res.data.delivered || []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  const acceptOrder = async (id) => {
    try {
      const updatedPreparing = preparingItems.map(item =>
        item.id === id ? { ...item, accepted: true } : item
      );
      setPreparingItems(updatedPreparing);

      await axios.patch('http://localhost:3001/restaurants/jmwgi4bk', {
        preparing: updatedPreparing
      });

      setTimeout(async () => {
        try {
          const res = await axios.get('http://localhost:3001/restaurants/jmwgi4bk');
          const freshPreparing = res.data.preparing || [];
          const freshDelivered = res.data.delivered || [];

          const itemToDeliver = freshPreparing.find(item => item.id === id);
          if (!itemToDeliver) return;

          const newPreparing = freshPreparing.filter(item => item.id !== id);
          const newDelivered = [...freshDelivered, { ...itemToDeliver, status: 'Delivered' }];

          setPreparingItems(newPreparing);
          setDeliveredItems(newDelivered);

          await axios.patch('http://localhost:3001/restaurants/jmwgi4bk', {
            preparing: newPreparing,
            delivered: newDelivered
          });
        } catch (err) {
          console.error('Failed to move to delivered:', err);
        }
      }, 10000);
    } catch (err) {
      console.error('Failed to accept order:', err);
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-column preparing-column">
        <h2>Preparing</h2>
        {preparingItems.length === 0 && <p>No items preparing now.</p>}
        {preparingItems.map(item => (
          <div key={item.id} className="order-item">
            <p>{item.name} x {item.qty}</p>
            {!item.accepted && (
              <button onClick={() => acceptOrder(item.id)}>Accept</button>
            )}
            {item.accepted && <p>Cooking... ⏱</p>}
          </div>
        ))}
      </div>

      <div className="orders-column delivered-column">
        <h2>Delivered</h2>
        {deliveredItems.length === 0 && <p>No items delivered yet.</p>}
        {deliveredItems.map(item => (
          <div key={item.id} className="order-item">
            <p>{item.name} x {item.qty} ✔ Delivered</p>
          </div>
        ))}
      </div>
    </div>
  );
};
