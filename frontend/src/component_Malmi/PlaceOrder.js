import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState({});
 const navigate = useNavigate();

  useEffect(() => {
    fetchMaxIdAndSetId();
    const email = sessionStorage.getItem('userEmail');
    const userID = sessionStorage.getItem('userID');
    setDeliveryEmail(email);
    setUserId(userID)
  }, [deliveryEmail, userId]);

      const validateValues = () => {
        let errors = {};
       
        const nameLetter =/^[A-Za-z]+$/
        if (!nameLetter.test(deliveryName)) {
          errors.deliveryName = "Delivery Name must contain only letters";
        }
       
        if (deliveryAddress.length < 5) {
          errors.deliveryAddress = "Please enter a valid Delivery Address";
        }
      
        if (!/^\d{3}$/.test(zipCode)) {
          errors.zipCode = "Zip Code must contain exactly 3 digits";
        }        
        
        
        if (!/^(0|[1-9])[0-9]{9}$/.test(deliveryPhone)){
          errors.deliveryPhone = "Phone Number should be 10 digits";
        }
       
        return errors;
      };
    
    const handleChange = (e) =>{
        const {name, value} = e.target;
    
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

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate on submit
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
      deliveryPhone: deliveryPhone,
      deliveryEmail: deliveryEmail,
      amount:amount,
      dCid:userId,
    };

  try {
     await Axios.post('http://localhost:3001/api/create-delivery', payload);
    console.log('Done');
    alert('Successfully added Delivery Details');
    navigate(`/Orders`);
    
  
  } catch (error) {
    console.error('Axios Error: ', error);
  }
};

  const fetchMaxIdAndSetId = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/api/getdelivery-maxid');
      const maxId = response.data?.maxId || 0; 
      setDeliveryId(maxId+1);
    } catch (error) {
      console.error('Axios Error (getMaxId): ', error);
    }
  };

  // Check if there are any errors
  const isFormInvalid = Object.keys(errors).length > 0;

  return (
         <div className="placeOrder-page">
          <Navi/>
         
    <div className='orderForm'>
          <form onSubmit={handleSubmit}>
          <h4 className='title'>Place Order</h4>
          <div className="mb-3">
             <label htmlFor="userName" className="form-label">Enter Your Name</label>
             <input type="text" name="userName" value = {deliveryName} className="form-control form-control-lg"  
              onChange={handleChange}  required/>
               {errors.deliveryName && <span className="error">{errors.deliveryName}</span>}
          </div>
          <div className="mb-3">
             <label htmlFor="userAddress" className="form-label">Enter Your Address </label>
             <input type="text" value = {deliveryAddress} className="form-control form-control-lg" name="userAddress" 
              onChange={handleChange}  required/>
               {errors.deliveryAddress && <span className="error">{errors.deliveryAddress}</span>}
          </div>
          <div className="mb-3">
             <label htmlFor="zipcode" className="form-label">Enter zipcode </label>
             <input type="Number" value = {zipCode} className="form-control form-control-lg" name="zipcode" 
              onChange={handleChange}  maxLength={3}  required/>
               {errors.zipCode && <span className="error">{errors.zipCode}</span>}

          </div>
          <div className="mb-3">
             <label htmlFor="phoneNumber" className="form-label">Enter Your Phone Number</label>
             <input type="text" value = {deliveryPhone} className="form-control form-control-lg" name="phoneNumber" 
             onChange={handleChange}   maxLength={10} required/>
             {errors.deliveryPhone && <span className="error">{errors.deliveryPhone}</span>}
          </div>

          <div className="mb-3">
             <label htmlFor="userAmount" className="form-label">Enter Payment Amount</label>
             <input type="text" name="userAmount" value = {amount} className="form-control form-control-lg"  
              readOnly/>
          </div>
          

        <button type="submit" className="btn btn-primary btn-lg"
         disabled={isFormInvalid}  // Disable button if there are errors
        >Submit</button>
      </form>
  
        </div>

        <Foot/>
        </div>




  );
};

export default PlaceOrder;
