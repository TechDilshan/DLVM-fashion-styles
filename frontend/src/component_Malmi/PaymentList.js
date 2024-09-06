import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './PaymentList.css';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch existing payments
    Axios.get('http://localhost:3001/api/payments')
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  }, []);

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/api/Payment/${id}`)
      .then(() => {
        setPayments(payments.filter(payment => payment.id !== id));
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  const handleUpdate = (id, updatedDetails) => {
    Axios.put(`http://localhost:3001/api/Payment/${id}`, updatedDetails)
      .then((response) => {
        setPayments(payments.map(payment => 
          payment.id === id ? response.data : payment
        ));
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  return (
    <div className="payment-list-page">
     <h2>Payment List</h2>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Holder Name</th>
      <th scope="col">Address</th>
      <th scope="col">Amount</th>
      <th scope="col">Card Number</th>
      <th scope="col">Exp Date</th>
      <th scope="col">CVV</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.cardHolderName}</td>
              <td>{payment.userAddress}</td>
              <td>LKR. {payment.amount}</td>
              <td>{payment.cardNumber}</td>
              <td>{payment.expiryDate}</td>
              <td>{payment.cvvNumber}</td>
              <td>
                <button type='button' className="btn btn-primary btn-lg"  onClick={() => handleUpdate(payment.id, { /* updated details */ })}>Update</button>
                <button type='button' className="btn btn-primary btn-lg"  onClick={() => handleDelete(payment.id)}>Delete</button>
              </td>
            </tr>
          ))}
  </tbody>
</table>
     
     
    </div>
    
  );
};

export default PaymentList;
