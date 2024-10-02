import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './PlaceOrder.css';
import Navi from '../Navi';
import Foot from '../footer'



const EditPlaceOrder = () => {
  
  const { amount } = useParams(); 
  
  const location = useLocation(); // Get the passed state from the previous page
  
  // Extracting values passed via state
  const { deliveryName: initialDeliveryName ='', deliveryAddress: initialDeliveryAddress ='', zipCode: initialZipCode=0, deliveryPhone: initialDeliveryPhone='' } = location.state || {};

  const [DeliveryId, setDeliveryId] = useState(0);
  const [deliveryName, setDeliveryName] = useState(initialDeliveryName || ''); // Set initial state from passed values
  const [deliveryAddress, setDeliveryAddress] = useState(initialDeliveryAddress || '');
  const [zipCode, setZipCode] = useState(initialZipCode || 0);
  const [deliveryPhone, setDeliveryPhone] = useState(initialDeliveryPhone || '');
  const [userEmail, setUserEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [deliveries, setDeliveries] = useState([]);



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
      const user = users.filter((u) => u.deliveryEmail === userEmail);
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


  const validateValues = () => {
    let errors = {};
    const nameLetter = /^[A-Za-z]+$/;
    if (!nameLetter.test(deliveryName)) {
      errors.deliveryName = "Delivery Name must contain only letters";
    }
    if (!deliveryAddress || deliveryAddress.length < 5) {
      errors.deliveryAddress = "Please enter a valid Delivery Address";
    }
    if (String(zipCode).length !== 3) {
      errors.zipCode = "Zip Code must contain exactly 3 digits";
    }        
    
    
    if (!/^(0|[1-9])[0-9]{9}$/.test(deliveryPhone)){
      errors.deliveryPhone = "Phone Number should be 10 digits";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'userName':
        setDeliveryName(value);
        break;
      case 'userAddress':
        setDeliveryAddress(value);
        break;
      case 'zipcode':
        setZipCode(value);
        break;
      case 'phoneNumber':
        setDeliveryPhone(value);
        break;
      default:
        break;
    }
    // Validate on change
    setErrors(validateValues());
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const validationErrors = validateValues();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
       console.log('Update Response:');  // Log the response
      alert('Successfully Updated Delivery Details');
      navigate('/Orders');
    } catch (error) {
      console.error('Axios Error: ', error);
    }
  };
  
  // const handlePayNow = () => {
  //   navigate(/payment/${amount});
  // };

  

  return (
    <div>
    <Navi/>
  
    <div className='orderForm'>
          <form onSubmit={handleUpdate}>
          <div className='title'>Update Delivery Details</div>
          
          <div className="mb-3">
             <label htmlFor="userName" className="form-label">Enter Your Name</label>
             <input type="text" name="userName" value = {deliveryName} className="form-control form-control-lg"  
              onChange={handleChange} required/>
                {errors.deliveryName && <span className="error">{errors.deliveryName}</span>}

          </div>
          <div className="mb-3">
             <label htmlFor="userAddress" className="form-label">Enter Your Address </label>
             <input type="text" value = {deliveryAddress} className="form-control form-control-lg" name="userAddress" 
             onChange={handleChange} required/>
              {errors.deliveryAddress && <span className="error">{errors.deliveryAddress}</span>}

          </div>
          <div className="mb-3">
             <label htmlFor="zipcode" className="form-label">Enter zipcode </label>
             <input type="Number" value = {zipCode} className="form-control form-control-lg" name="zipcode" 
             onChange={handleChange} required/>
              {errors.zipCode && <span className="error">{errors.zipCode}</span>}

          </div>
          <div className="mb-3">
             <label htmlFor="phoneNumber" className="form-label">Enter Your Phone Number</label>
             <input type="text" value = {deliveryPhone} className="form-control form-control-lg" name="phoneNumber" 
            onChange={handleChange}required/>
             {errors.deliveryPhone && <span className="error">{errors.deliveryPhone}</span>}
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