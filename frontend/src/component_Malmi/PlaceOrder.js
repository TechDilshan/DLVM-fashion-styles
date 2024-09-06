import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';



const PlaceOrder = () => {
  const [orderDetails, setOrderDetails] = useState({
    userName: '',
    userAddress: '',
    zipcode: '',
    phoneNumber: ''
  });
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    Axios.get('http://localhost:3001/api/PlaceOrder')
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  }, []);

  const handleChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Add or update payment
    Axios.post('http://localhost:3001/api/PlaceOrder', orderDetails)
      .then((response) => {
        setDetails([...details, response.data]);
        navigate('/Payment'); // Redirect to the payment  page
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  return (
         <div className="placeOrder-page">
         
    <div className='form-container'>
          <form onSubmit={handleSubmit}>
          <h4 className='title'>Place Order</h4>
          <div className="mb-3">
             <label htmlFor="userName" className="form-label">Enter Your Name</label>
             <input type="text" name="userName" value = {orderDetails.userName} className="form-control form-control-lg"  
              onChange={handleChange} required/>
          </div>
          <div className="mb-3">
             <label htmlFor="userAddress" className="form-label">Enter Your Address </label>
             <input type="text" value = {orderDetails.userAddress} className="form-control form-control-lg" name="userAddress" 
              onChange={handleChange} required/>
          </div>
          <div className="mb-3">
             <label htmlFor="zipcode" className="form-label">Enter zipcode </label>
             <input type="Number" value = {orderDetails.zipcode} className="form-control form-control-lg" name="zipcode" 
              onChange={handleChange} required/>

          </div>
          <div className="mb-3">
             <label htmlFor="phoneNumber" className="form-label">Enter Your Phone Number</label>
             <input type="String" value = {orderDetails.cvvNumber} className="form-control form-control-lg" name="phoneNumber" 
              onChange={handleChange}  maxLength={10} required/>
          </div>
          

        <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Submit</button>
      </form>
  
        </div>
        </div>




  );
};

export default PlaceOrder;
