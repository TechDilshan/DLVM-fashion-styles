import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import Navi from '../Navi';
import Foot from '../footer'



const EditPlaceOrder = () => {
  

  const { amount } = useParams(); 
  
  const [DeliveryId, setDeliveryId] = useState(0);
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [zipCode, setZipCode] = useState(0);
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

 useEffect(() => {
  const email = sessionStorage.getItem('userEmail');
  setUserEmail(email);
  DeliveryDetails();
}, [userEmail]);

  

  const DeliveryDetails = async () => {
    // const email = sessionStorage.getItem('userEmail');
    // setUserEmail('abc@gmail.com');
    try {
      const response = await Axios.get('http://localhost:3001/api/deliveries');
      console.log(response.data);
      const users = response.data.response;
      const user = users.find((u) => u.deliveryEmail === userEmail);
      if (user) {
        setDeliveryId(user.deliveryId);
        setDeliveryName(user.deliveryName);
        setDeliveryAddress(user.deliveryAddress);
        setZipCode(user.zipCode);
        setDeliveryPhone(user.deliveryPhone);
      }

    } catch (error) {
      console.error('Axios Error (getMaxId): ', error);
    }
  };

  const handlePayNow = () =>{
    navigate(`/payment/${amount}`)
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    // console.log(DeliveryId)
    // console.log(deliveryName)
    // console.log(deliveryAddress)
    // console.log(zipCode)
    // console.log(deliveryPhone)

    const payload = {
      deliveryId: DeliveryId,
      deliveryName: deliveryName,
      deliveryAddress: deliveryAddress,
      zipCode: zipCode,
      deliveryPhone:deliveryPhone,
      amount:amount
      
    };
    console.log(payload);
    try {
       await Axios.post('http://localhost:3001/api/update-delivery', payload);
      console.log('Done');
      alert('Successfully Updated Delivery Details');
    } catch (error) {
      console.error('Axios Error: ', error);
    }
  };
  

  return (
    <div>
    <Navi/>
  
    <div className='orderForm'>
          <form onSubmit={handleUpdate}>
          <div className='title'>Update Delivery Details</div>
          <div className="mb-3">
             <label htmlFor="userID" className="form-label">Enter Delivery ID</label>
             <input type="text" name="userID" value = {DeliveryId} className="form-control form-control-lg"  
              onChange={(e) => setDeliveryId(e.target.value)} required/>
          </div>
          <div className="mb-3">
             <label htmlFor="userName" className="form-label">Enter Your Name</label>
             <input type="text" name="userName" value = {deliveryName} className="form-control form-control-lg"  
              onChange={(e) => setDeliveryName(e.target.value)} required/>
          </div>
          <div className="mb-3">
             <label htmlFor="userAddress" className="form-label">Enter Your Address </label>
             <input type="text" value = {deliveryAddress} className="form-control form-control-lg" name="userAddress" 
              onChange={(e) => setDeliveryAddress(e.target.value)} required/>
          </div>
          <div className="mb-3">
             <label htmlFor="zipcode" className="form-label">Enter zipcode </label>
             <input type="Number" value = {zipCode} className="form-control form-control-lg" name="zipcode" 
              onChange={(e) => setZipCode(e.target.value)} required/>

          </div>
          <div className="mb-3">
             <label htmlFor="phoneNumber" className="form-label">Enter Your Phone Number</label>
             <input type="text" value = {deliveryPhone} className="form-control form-control-lg" name="phoneNumber" 
             onChange={(e) => setDeliveryPhone(e.target.value)} required/>
          </div>

          <div className="mb-3">
             <label htmlFor="userAmount" className="form-label">Enter Payment Amount</label>
             <input type="text" name="userAmount" value = {amount} className="form-control form-control-lg"  
              readOnly/>
          </div>
          

        <button type="submit" className="btn btn-primary btn-lg">Update</button>
        <button className="btn btn-primary btn-lg" onClick={() => handlePayNow()}>Proceed to Payment</button>
      </form>
  
        </div>

        <Foot/>
        </div>




  );
};

export default EditPlaceOrder;
