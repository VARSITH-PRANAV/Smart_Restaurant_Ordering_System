import React, { useEffect, useState } from 'react';
import "./AdminPage.css";
import axios from 'axios';

export const AdminPage = () => {
  const [preparingItems, setPreparingItems] = useState([]);
  const [deliveredItems, setDeliveredItems] = useState([]);

  useEffect(() => {
    fetchAllOrders();
  });

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3001/restaurants/jmwgi4bk');
      setPreparingItems(res.data.preparing || []);
      setDeliveredItems(res.data.delivered || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin Panel</h2>

      <div className="admin-section">
        <h3>Preparing Items</h3>
        {preparingItems.length === 0 ? (
          <p className="no-items">No items are being prepared.</p>
        ) : (
          <div className="item-list">
            {preparingItems.map(item => (
              <div key={item.id} className="item-card">
                <p>{item.name} x {item.qty}</p>
                <p>Status: {item.accepted ? 'Cooking' : 'Not accepted'}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-section">
        <h3>Delivered Items</h3>
        {deliveredItems.length === 0 ? (
          <p className="no-items">No items delivered yet.</p>
        ) : (
          <div className="item-list">
            {deliveredItems.map(item => (
              <div key={item.id} className="item-card">
                <p>{item.name} x {item.qty}</p>
                <p>Status: Delivered</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
