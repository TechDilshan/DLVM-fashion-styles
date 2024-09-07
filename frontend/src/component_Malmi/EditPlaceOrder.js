import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import Navi from '../Navi';
import Foot from '../footer'



const PlaceOrder = () => {
  

  const { amount } = useParams(); 
  const [DeliveryId, setDeliveryId] = useState(0);
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [zipCode, setZipCode] = useState(0);
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    setUserEmail('abc@gmail.com');
    DeliveryDetails();
    
  }, [userEmail]);

  const DeliveryDetails = async () => {
    // const email = sessionStorage.getItem('userEmail');
    // setUserEmail('abc@gmail.com');
    try {
      const response = await Axios.get('http://localhost:3001/api/deliveries');
      const users = response.data.response;
      const user = users.find((u) => u.deliveryEmail === userEmail);
      console.log(user);
      setDeliveryId(user.deliveryId)
      setDeliveryName(user.deliveryName)
      setDeliveryAddress(user.deliveryAddress)
      setZipCode(user.zipCode)
      setDeliveryPhone(user.deliveryPhone)

    } catch (error) {
      console.error('Axios Error (getMaxId): ', error);
    }
  };

  const handlePayNow = () =>{
    navigate(`/payment/${amount}`)
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    console.log(DeliveryId)
    console.log(deliveryName)
    console.log(deliveryAddress)
    console.log(zipCode)
    console.log(deliveryPhone)

    const payload = {
      deliveryId: DeliveryId,
      deliveryName: deliveryName,
      deliveryAddress: deliveryAddress,
      zipCode: zipCode,
      deliveryPhone: deliveryPhone,
    };
    Axios.post('http://localhost:3001/api/update-delivery', payload)
      .then((response) => {
        console.log('Done');
        alert('Successfully updated Delivery Details.!')
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });

  }

  return (
         <div className="placeOrder-page">
          <Navi/>
         
    <div className='form-container'>
          <form onSubmit={handleUpdate}>
          <h4 className='title'>Delivery Details</h4>
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
          

        <button type="submit" className="btn btn-primary btn-lg">Update</button>
        <button className="btn btn-primary btn-lg" onClick={() => handlePayNow()}>Proceed to Payment</button>
      </form>
  
        </div>

        <Foot/>
        </div>




  );
};

export default PlaceOrder;
