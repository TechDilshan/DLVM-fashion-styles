import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import Navi from '../Navi';
import Foot from '../footer'



const PlaceOrder = () => {
  

  const [DeliveryId, setDeliveryId] = useState(0);
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [zipCode, setZipCode] = useState(0);
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');


  useEffect(() => {
    fetchMaxIdAndSetId();
    const email = sessionStorage.getItem('userEmail');
    setDeliveryEmail(email);
  }, [deliveryEmail]);

  const handleSubmit = async (e) => {
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
      deliveryEmail: deliveryEmail,
    };
    Axios.post('http://localhost:3001/api/create-delivery', payload)
      .then((response) => {
        console.log('Done');
        alert('Successfully added Delivery details')
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });

  }

  const fetchMaxIdAndSetId = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/api/getdelivery-maxid');
      const maxId = response.data?.maxId || 0; 
      setDeliveryId(maxId+1);
    } catch (error) {
      console.error('Axios Error (getMaxId): ', error);
    }
  };

  return (
         <div className="placeOrder-page">
          <Navi/>
         
    <div className='form-container'>
          <form onSubmit={handleSubmit}>
          <h4 className='title'>Place Order</h4>
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
             onChange={(e) => setDeliveryPhone(e.target.value)}  maxLength={10} required/>
          </div>
          

        <button type="submit" className="btn btn-primary btn-lg">Submit</button>
      </form>
  
        </div>

        <Foot/>
        </div>




  );
};

export default PlaceOrder;
