import React, { useState, useEffect } from 'react';
import { storage } from "../firebase"; // Import your Firebase configuration
import { collection, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom';
import '../index.css';
import './Recommend.css'; // Import your styles

const Recommend = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(storage, "products")); // Fetch products from Firestore
        const itemsList = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(item => item.stock > 30); // Filter items with stock greater than 30
          console.log("Fetched items:", itemsList); // Add this line
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
  
    <div className="recommendations-container">
        <div className='header'>Recommended for You</div>
      <div className="recommendations-grid">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className="recommendation-item">
              <img src={item.imageUrl} alt={item.name} className="recommendation-image" />
              <h3 className="recommendation-name">{item.name}</h3>
              <p className="recommendation-price">LKR. {item.price}</p>
              <Link to={{ pathname: "/product-details", state: { row: item } }} className="view-details">
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No recommendations available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Recommend;
