import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import cat from '../assets/Heade Component/category.json';
import { cartContext } from '../App';
import '../components/MenuPage.css';

export const MenuPage = () => {
  const {categoryName}=useParams();
  const {cart,setCart}=useContext(cartContext);

  const category=cat.find(c=>c.name.toLowerCase()===categoryName.toLowerCase());

  const addCart=(item)=>{
    setCart([...cart,{...item,qty:1}]);
  };

  const removeCart = (id) => {
    setCart(cart.filter(c => c.id !== id));
  };

  return (
    <div className="menu-container">
      <h2 className="menu-title">{categoryName} - Menu</h2>
        <div className="menu-list">
          {category.details.map(item => (
            <div key={item.id} className="menu-card">
              <img src={item.pic} alt={item.name} className="menu-img" />
              <h3 className="menu-item-name">{item.name}</h3>
              <p className="menu-item-type">{item.type}</p>
              <p className="menu-item-price">₹ {item.amount}</p>
              {cart.find(c=>c.id===item.id)?(
                <button className="remove-btn" onClick={()=>removeCart(item.id)}>Remove from cart</button>
              ) : (
                <button className="add-btn" onClick={()=>addCart(item)}>Add to cart</button>
              )}
            </div>
          ))}
        </div>
      
    </div>
  );
};
