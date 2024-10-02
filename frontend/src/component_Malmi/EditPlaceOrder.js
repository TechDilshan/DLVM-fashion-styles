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
  const [errors, setErrors] = useState({});

  const [deliveryNameError, setDeliveryNameError] = useState('');
  const [deliveryAddressError, setDeliveryAddressError] = useState('');
  const [zipCodeError, setZipCodeError] = useState('');
  const [deliveryPhoneError, setDeliveryPhoneError] = useState('');

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


  

 

  const handleUpdate = async (e) => {
    e.preventDefault();
   

    // console.log(DeliveryId)
    // console.log(deliveryName)
    // console.log(deliveryAddress)
    // console.log(zipCode)
    // console.log(deliveryPhone)

    if (validateForm()) {
      const payload = {
        deliveryId: DeliveryId,
        deliveryName: deliveryName,
        deliveryAddress: deliveryAddress,
        zipCode: zipCode,
        deliveryPhone: deliveryPhone,
        userEmail: userEmail,
      };
  

    console.log(payload);
    try {
       await Axios.post('http://localhost:3001/api/update-delivery', payload);
      console.log('Done');
      alert('Successfully Updated Delivery Details');
      navigate('/Orders');
    } catch (error) {
      console.error('Axios Error: ', error);
    }
  }
  };
  
  // const handlePayNow = () => {
  //   navigate(`/payment/${amount}`);
  // };

  const validateForm = () => {
    let isValid = true;

    // Validate deliveryName
  if (!deliveryName.trim()) {
    setDeliveryNameError('Delivery Name is required');
    isValid = false;
  } else {
    setDeliveryNameError('');
  }

     // Validate deliveryAddress
  if (!deliveryAddress.trim()) {
    setDeliveryAddressError('Delivery Address is required');
    isValid = false;
  } else {
    setDeliveryAddressError('');
  }

    // Validate zipCode
  if (!zipCode) {
    setZipCodeError('Zip Code is required');
    isValid = false;
  } else if (!/^\d{5}$/.test(zipCode)) {
    setZipCodeError('Zip Code should be 5 digits');
    isValid = false;
  } else {
    setZipCodeError('');
  }
    // Validate deliveryPhone
  if (!deliveryPhone.trim()) {
    setDeliveryPhoneError('Phone Number is required');
    isValid = false;
  } else if (!/^\d{10}$/.test(deliveryPhone.trim())) {
    setDeliveryPhoneError('Phone Number should be 10 digits');
    isValid = false;
  } else {
    setDeliveryPhoneError('');
  }

    return isValid;
   };
 

   

  return (
    <div>
    <Navi/>
  
    <div className='orderForm'>
          <form onSubmit={handleUpdate}>
          <div className='title'>Update Delivery Details</div>
          
          <div className="mb-3">
             <label htmlFor="userName" className="form-label">Enter Your Name</label>
             <input type="text" name="userName" value = {deliveryName} className="form-control form-control-lg"  
             onChange={(e) => setDeliveryName(e.target.value)} required/>             
                {deliveryNameError && <div className="error">{deliveryNameError}</div>}

          </div>
          <div className="mb-3">
             <label htmlFor="userAddress" className="form-label">Enter Your Address </label>
             <input type="text" value = {deliveryAddress} className="form-control form-control-lg" name="userAddress" 
             onChange={(e) => setDeliveryAddress(e.target.value)} 
              required 
            />
            {deliveryAddressError && <div className="error">{deliveryAddressError}</div>}

          </div>
          <div className="mb-3">
             <label htmlFor="zipcode" className="form-label">Enter zipcode </label>
             <input type="Number" value = {zipCode} className="form-control form-control-lg" name="zipcode" 
             onChange={(e) => setZipCode(e.target.value)} 
              required 
            />
            {zipCodeError && <div className="error">{zipCodeError}</div>}

          </div>
          <div className="mb-3">
             <label htmlFor="phoneNumber" className="form-label">Enter Your Phone Number</label>
             <input type="text" value = {deliveryPhone} className="form-control form-control-lg" name="phoneNumber" 
         onChange={(e) => setDeliveryPhone(e.target.value)} 
              required 
            />
            {deliveryPhoneError && <div className="error">{deliveryPhoneError}</div>}
          </div>

          <div className="mb-3">
             <label htmlFor="userAmount" className="form-label">Enter Payment Amount</label>
             <input type="text" name="userAmount" value = {amount} className="form-control form-control-lg"  
              readOnly/>
          </div>
          

        <button type="submit" className="btn btn-primary btn-lg"
    
        >Update</button>
       
      </form>
  
        </div>

        <Foot/>
        </div>




  );
};

export default EditPlaceOrder;
