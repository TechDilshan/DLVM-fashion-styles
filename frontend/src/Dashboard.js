import React from 'react';
import './Dashboard.css';
import { useNavigate } from "react-router-dom";



const Dashboard = () => {

  const navigate = useNavigate();

  const profileManagement = () =>{
    navigate('/Users');
  }

  return (
    <div className="dashboard-container">
      <div className="box-row">
        <button className="box box1" onClick={() => profileManagement()}>
          <h2 className='box-name' >Product Management</h2>
        </button>
        <button className="box box2">
          <h2 className='box-name'>Order Management</h2>
        </button>
      </div>
      <div className="box-row">
        <button className="box box3">
          <h2 className='box-name'>Profile Management</h2>
        </button>
        <button className="box box4">
          <h2 className='box-name'>User Feedbacks</h2>
        </button>
      </div>
      <button className="logout-btn">Logout</button>
    </div>
  );
};

export default Dashboard;
