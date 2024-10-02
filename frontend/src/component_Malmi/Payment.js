import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Payment.css';
import Navi from '../Navi';
import Footer from '../footer'
//import PlaceOrder from './PlaceOrder';

const Payment = () => {

  const { amount } = useParams(); 

  const [payid, setPayid] = useState(0);
  const [cardNumber, setCardNumber] = useState(0);
  const [expDate, setExpDate] = useState('');
  const [holderName, setHolderName] = useState('');
  const [cvv, setCvv] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMaxIdAndSetId();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(payid)
    console.log(amount)
    console.log(cardNumber)
    console.log(expDate)
    console.log(holderName)
    console.log(cvv)

    const payload = {
      payid: payid,
      amount: amount,
      cardNumber: cardNumber,
      expDate: expDate,
      holderName: holderName,
      cvv: cvv,
      payDate: Date(),
    };
    Axios.post('http://localhost:3001/api/create-payment', payload)
      .then((response) => {
        console.log('Done');
        alert('Successfully Place Order..!');
        navigate(`/PlaceOrder/${amount}`);
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });

  }

  const fetchMaxIdAndSetId = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/api/getpay-maxid');
      const maxId = response.data?.maxId || 0; 
      setPayid(maxId+1);
    } catch (error) {
      console.error('Axios Error (getMaxId): ', error);
    }
  };

 
  
  return (

    <div>
       <Navi/> 
         
    <div className='paymentForm'>
          <form onSubmit={handleSubmit}>
          <div className='title'>Payment Details</div>
          <div className="mb-3">
             <label htmlFor="userAmount" className="form-label">Enter Payment Amount</label>
             <input type="text" name="userAmount" value = {amount} className="form-control form-control-lg"  
              readOnly/>
          </div>

          <div className="mb-3">
             <label htmlFor="cardNumber" className="form-label">Enter Card Number</label>
             <input type="text" value = {cardNumber} className="form-control form-control-lg" name="cardNumber" 
              onChange={(e) => setCardNumber(e.target.value)} required/>
          </div>

          <div className="mb-3">
             <label htmlFor="expiryDate" className="form-label">Enter Expire Date</label>
             <input type="text" value = {expDate} className="form-control form-control-lg" name="expiryDate" 
              onChange={(e) => setExpDate(e.target.value)} required/>

          </div>

          <div className="mb-3">
             <label htmlFor="cardHolderName" className="form-label">Enter Card Holder Name</label>
             <input type="text" value = {holderName} className="form-control form-control-lg" name="cardHolderName" 
              onChange={(e) => setHolderName(e.target.value)} required/>
          </div>

          <div className="mb-3">
             <label htmlFor="cvvNumber" className="form-label">Enter CVV</label>
             <input type="text" value = {cvv} className="form-control form-control-lg" name="cvvNumber" 
              onChange={(e) => setCvv(e.target.value)}  maxLength={3} required/>
          </div>
          

        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
      
      </form>
  
        </div>
   

<Footer/>
        </div>


  );
};

export default Payment;
