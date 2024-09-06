import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './PlaceOrder.css';

const EditPlaceOrder = () => {
  const { orderId } = useParams(); // Assuming you have orderId as a parameter in your route
  const [orderDetails, setOrderDetails] = useState({
    userName: '',
    userAddress: '',
    zipcode: '',
    phoneNumber: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch order details by orderId
    Axios.get(`http://localhost:3001/api/PlaceOrder/${orderId}`)
      .then((response) => {
        setOrderDetails(response.data); // Assuming response.data contains order details
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  }, [orderId]);

  const handleChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Update order details
    Axios.put(`http://localhost:3001/api/PlaceOrder/${orderId}`, orderDetails)
      .then(() => {
        navigate('/Payment'); // Redirect to the payment page after update
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  return (
    <div className="placeOrder-page">
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h4 className='title'>Edit Order</h4>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">Enter Your Name</label>
            <input type="text" name="userName" value={orderDetails.userName} className="form-control form-control-lg"
                   onChange={handleChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="userAddress" className="form-label">Enter Your Address</label>
            <input type="text" value={orderDetails.userAddress} className="form-control form-control-lg"
                   name="userAddress" onChange={handleChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="zipcode" className="form-label">Enter zipcode</label>
            <input type="number" value={orderDetails.zipcode} className="form-control form-control-lg"
                   name="zipcode" onChange={handleChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Enter Your Phone Number</label>
            <input type="tel" value={orderDetails.phoneNumber} className="form-control form-control-lg"
                   name="phoneNumber" onChange={handleChange} maxLength={10} required/>
          </div>

          <button type="submit" className="btn btn-primary btn-lg">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditPlaceOrder;
