import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Home.css';
import enter from '../assets/Home Components/enter.png';

export const Home = () => {
  const navigate = useNavigate();

  const goToMenu=()=>{
    navigate('/jmwgi4bk/2/category/Starters');
  };

  return (
    <div className="home-container">
      <h2>WELCOME TO VARSITH CAFE !!</h2>
      <div>
        <img src={enter} alt="Enter" className="enter-img" onClick={goToMenu} 
        />
      </div>
    </div>
  );
};
