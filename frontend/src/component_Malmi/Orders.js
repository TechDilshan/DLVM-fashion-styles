import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './Orders.css';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#def0f0',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1px solid #ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textDecoration: 'underline',
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDetail: {
    fontSize: 14,
    marginBottom: 3,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});

const GenerateReceipt = ({ orders, totalAmount, order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Your Receipt</Text>
        {orders.map(orders => {
          const filteredOrder = order.find(c => c.id === orders.id);
          return (
            <View key={orders.id} style={styles.orders}>
              <Text>Name                     : {filteredOrder ? filteredOrder.cardHolderName : 'Name not available'}</Text>
              <Text>Quantity                 : {orders.quantity} qty.</Text>
            </View>
          );
        })}
        <Text style={styles.totalAmount}>Total Amount :  LKR. {totalAmount} /=</Text>
      </View>
    </Page>
  </Document>
);

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch existing payments
    Axios.get('http://localhost:3001/api/payments')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  }, []);

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/api/Payment/${id}`)
      .then(() => {
        setOrders(orders.filter(order => order.id !== id));
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  const handleUpdate = (id, updatedDetails) => {
    Axios.put(`http://localhost:3001/api/Payment/${id}`, updatedDetails)
      .then((response) => {
        setOrders(orders.map(orders => 
          orders.id === id ? response.data : orders
        ));
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

    // Calculate total amount
    const totalAmount = orders.reduce((total, order) => total + order.totalAmount, 0);

  return (
    <div className="orders">
     <h2>Order List</h2>
     <button type='button' className="btn btn-primary btn-lg">
          <PDFDownloadLink document={<GenerateReceipt orders={orders} total={totalAmount}  />} fileName="receipt.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Bill')}
          </PDFDownloadLink>
          </button>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Order ID</th>
      <th scope="col">Holder Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Total Amount</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {orders.map(orders => (
            <tr key={orders.id}>
              <td>{orders.id}</td>
              <td>{orders.cardHolderName}</td>
              <td>{orders.Ouantity}</td>
              <td>LKR. {orders.totalAmount}</td>
              <td>
                <button type='button' className="btn btn-primary btn-lg"  onClick={() => handleUpdate(orders.id, {})}>Update</button>
                <button type='button' className="btn btn-primary btn-lg"  onClick={() => handleDelete(orders.id)}>Delete</button>
              </td>
            </tr>
          ))}
  </tbody>
</table>
     
     
    </div>
    
  );
};

export default Orders;
