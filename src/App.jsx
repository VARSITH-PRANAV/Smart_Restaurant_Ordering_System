import React, { useState, createContext } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Viewcart } from './components/Viewcart';
import { MenuPage } from './components/MenuPage';
import { OrdersPage } from './components/OrdersPage';
import { PaymentPage } from './components/PaymentPage';
import { AdminPage } from './components/admin/AdminPage';

export const cartContext = createContext([]);

export const App = () => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <cartContext.Provider value={{ cart, setCart, orders, setOrders }}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </cartContext.Provider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isHome=location.pathname==='/';
  const isAdmin=location.pathname.includes('/admin');

  return (
    <>
      {!isHome && !isAdmin && <Header />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:restaurantId/:tableNo/cart" element={<Viewcart />} />
          <Route path="/:restaurantId/:tableNo/category/:categoryName" element={<MenuPage />}/>
          <Route path="/:restaurantId/:tableNo/orders" element={<OrdersPage />} />
          <Route path="/:restaurantId/:tableNo/pay-bill" element={<PaymentPage />}/>
          <Route path="/:restaurantId/admin" element={<AdminPage />} />
        </Routes>
      </div>
      {!isHome && !isAdmin && <Footer />}
    </>
  );
};
