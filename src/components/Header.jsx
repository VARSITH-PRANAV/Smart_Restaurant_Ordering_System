import React, {useState,useContext} from 'react';
import '../components/Header.css';
import { NavLink, useNavigate } from "react-router-dom";
import icon from '../assets/Heade Component/icon.svg';
import cat from '../assets/Heade Component/category.json';
import { cartContext } from '../App';


export const Header=()=>{
  const {cart,setCart}=useContext(cartContext);
  const [categories]=useState(cat);
  const [activeCategory,setActiveCategory]=useState('Starters');
  const navigate=useNavigate();

  const restaurantId='jmwgi4bk';
  const tableNo='2';

  const handleCategoryClick=(categoryName)=>{
    setActiveCategory(categoryName);
    navigate(`/${restaurantId}/${tableNo}/category/${categoryName}`);
  };

  return (
    <div className='nav-container'>
      <div className="navbar">
        <div className="logo">
          <img src={icon} alt="My Icon" className="icon" />
          <span className="brand">Varsith Cafe</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({isActive})=>isActive?"active":""}>Home</NavLink>
          </li>
          <li>
            <NavLink to={`/${restaurantId}/${tableNo}/category/${activeCategory}`} 
              className={({isActive})=>isActive?"active":""}>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${restaurantId}/${tableNo}/orders/`} 
              className={({isActive})=>isActive?"active":""}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${restaurantId}/${tableNo}/cart`} 
              className={({isActive})=>isActive?"active":""}>
              <span className='cart-count'>{cart.length}</span> Cart
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${restaurantId}/${tableNo}/pay-bill`} 
              className={({isActive})=>isActive?"active":""}>
              Pay Bill
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="item-category">
        {categories.map((items) => (
          <div
            key={items.id}
            className={activeCategory===items.name?'category-active':''}
            onClick={()=>handleCategoryClick(items.name)}
          >
            <img src={items.pic} alt={items.name} />
            <p className='name'>{items.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
