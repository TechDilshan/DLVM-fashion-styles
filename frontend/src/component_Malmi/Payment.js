import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Payment.css';



const Payment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    userAddress: '',
    cardNumber: '',
    expiryDate: '',
    cardHolderName: '',
    cvvNumber:'',
  });
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing payments
    Axios.get('http://localhost:3001/api/Payment')
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  }, []);

  const handleChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Add or update payment
    Axios.post('http://localhost:3001/api/Payment', paymentDetails)
      .then((response) => {
        setPayments([...payments, response.data]);
        navigate('/PaymentList'); // Redirect to the payment list page
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  return (
         <div className="payment-page">
         
    <div className='form-container'>
          <form onSubmit={handleSubmit}>
          <h4 className='title'>Payment</h4>
          <div className="mb-3">
             <label htmlFor="userAddress" className="form-label">Enter Your Address</label>
             <input type="text" name="userAddress" value = {paymentDetails.userAddress} className="form-control form-control-lg"  
              onChange={handleChange} required/>
          </div>
          <div className="mb-3">
             <label htmlFor="cardNumber" className="form-label">Enter Card Number</label>
             <input type="text" value = {paymentDetails.cardNumber} className="form-control form-control-lg" name="cardNumber" 
              onChange={handleChange} required/>
          </div>
          <div className="mb-3">
             <label htmlFor="expiryDate" className="form-label">Enter Expire Date</label>
             <input type="text" value = {paymentDetails.expiryDate} className="form-control form-control-lg" name="expiryDate" 
              onChange={handleChange} required/>

          </div>
          <div className="mb-3">
             <label htmlFor="cardHolderName" className="form-label">Enter Card Holder Name</label>
             <input type="text" value = {paymentDetails.cardHolderName} className="form-control form-control-lg" name="cardHolderName" 
              onChange={handleChange} required/>
          </div>
          <div className="mb-3">
             <label htmlFor="cvvNumber" className="form-label">Enter CVV</label>
             <input type="text" value = {paymentDetails.cvvNumber} className="form-control form-control-lg" name="cvvNumber" 
              onChange={handleChange}  maxLength={3} required/>
          </div>
          

        <button type="submit" className="btn btn-primary btn-lg" onClick={handleSubmit}>Submit</button>
      </form>
  
        </div>
        </div>




  );
};

export default Payment;
