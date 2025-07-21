import React, { useEffect, useState } from 'react';
import '../components/PaymentPage.css';
import axios from 'axios';

export const PaymentPage = () => {
  const [deliveredItems, setDeliveredItems] = useState([]);

  useEffect(() => {
    fetchDeliveredItems();
  }, []);

  const fetchDeliveredItems = async () => {
    try {
      const res = await axios.get('http://localhost:3001/restaurants/jmwgi4bk');
      setDeliveredItems(res.data.delivered || []);
    } catch (err) {
      console.error('Failed to fetch delivered items:', err);
    }
  };

  const handlePayAll = async () => {
    if (deliveredItems.length === 0) return;

    try {
      await axios.patch('http://localhost:3001/restaurants/jmwgi4bk', {
        delivered: []
      });
      setDeliveredItems([]);
      alert('Payment successful for all items!');
    } catch (err) {
      console.error('Payment failed:', err);
      alert('Failed to process payment. Please try again.');
    }
  };

  const totalAmount = deliveredItems.reduce((acc, item) => acc + (parseInt(item.amount) * item.qty), 0);

  return (
    <div className="payment-page">
      <h2>Pending Payments</h2>
      {deliveredItems.length === 0 ? (
        <p className="no-items">No items pending payment. 🎉</p>
      ) : (
        <>
          <div className="payment-list">
            {deliveredItems.map(item => (
              <div key={item.id} className="payment-item">
                <p>{item.name} x {item.qty} - ₹ {parseInt(item.amount) * item.qty}</p>
              </div>
            ))}
          </div>
          <div className="payment-footer">
            <h3>Total Amount: ₹ {totalAmount}</h3>
            <button className="pay-all-btn" onClick={handlePayAll}>Pay All</button>
          </div>
        </>
      )}
    </div>
  );
};
