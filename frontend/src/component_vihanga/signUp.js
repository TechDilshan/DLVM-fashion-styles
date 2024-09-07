// src/components/Signup.js
import React, { useState, useEffect } from 'react';
import './CSS/signup.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cusid, setCusid] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMaxIdAndSetId();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add user registration logic here
    //console.log({ firstName, lastName, email, address, phone, password });

    const payload = {
        cusid: cusid,
        firstName: firstName,
        lastName: lastName,
        cusEmail: email,
        cusAddress: address,
        cusNumber:  phone,
        password: password,
      };
      Axios.post('http://localhost:3001/api/create-customer', payload)
        .then((response) => {
          console.log('Done');
          alert('Successfully created account..!');
          navigate('/login');
        })
        .catch((error) => {
          console.error('Axios Error: ', error);
        });
    
        
  };

  const fetchMaxIdAndSetId = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/api/getcus-maxid');
      const maxId = response.data?.maxId || 0; 
      setCusid(maxId+1);
    } catch (error) {
      console.error('Axios Error (getMaxId): ', error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

          <div className="input-group-register">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="input-group-register">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="input-group-register">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="input-group-register">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="input-group-register">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="input-group-register">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password"
              required
            />
          </div>

          <button className="signup-btn" type="submit">Sign Up</button>

          <p>Already have an account? <a href="/login">Login here</a></p>
        </form>
      </div>
    </div>
  );
};

export default Register;