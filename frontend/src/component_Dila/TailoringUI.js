import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS_C/TailoringUI.css';
import Navi from '../Navi';
import Foot from '../footer';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import logo from '../image/logo.jpg';
import { LinearProgress } from "@mui/material";

const CustomTailoringForm = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [desiredOutfit, setDesiredOutfit] = useState('');
  const [negativeOutfit, setNegativeOutfit] = useState('');
  const [responseLink, setResponseLink] = useState('');
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState('abc@gmail.com');
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState('pending');
  const [tid, setTid] = useState(10000);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countryList = response.data.map((country) => ({
          name: country.name.common,
          flag: country.flags[1] // use the 'flags' property to get the flag URL
        }));
        // Sort countries alphabetically by name
        countryList.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
      } catch (error) {
        console.error('Error fetching countries', error);
      }
    };

    fetchCountries();
    fetchMaxIdAndSetId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(desiredOutfit,gender,country, negativeOutfit);

    try {
      const formData = new FormData();
      formData.append('outfit', desiredOutfit);
      formData.append('gender', gender);
      formData.append('country', country);
      formData.append('negative', negativeOutfit);
      formData.append('email', 'pmmufiiokqennikaql@hthlm.com');
      formData.append('password', 'abcdef');
//gamagemadu001@gmail.com
      const response = await axios.post('https://thenewblack.ai/api/1.1/wf/clothing', formData);


      const link = response.data; // Adjust according to actual API response
      setResponseLink(link);

      // Log the response link to the console
      console.log('Generated Outfit Link:', link);
      setLoading(false);
      
    } catch (error) {
      console.error('Error submitting form data', error);
    }
  };

  const handleRegenerate = () => {
    // Reload the page
    window.location.reload();
  };

  const fetchMaxIdAndSetId = async () => {
    try {
      const response = await Axios.get('http://localhost:3001/api/getmaxidt');
      const maxId = response.data?.maxId || 10000
      setTid(maxId + 1);

    } catch (error) {
      console.error('Axios Error (getmaxidt): ', error);
    }
  };

  const handleRequestOutfit = async () => {
    const payload = {
      tid: tid,
      email: email,
      responseLink: responseLink,
      gender: gender,
      desiredOutfit: desiredOutfit,
      negativeOutfit: negativeOutfit,
      qty: qty,
      price: price,
      status: status,
    };
    Axios.post('http://localhost:3001/api/createtailoring', payload)
      .then((response) => {
        console.log('Done');
        alert('Successfully Generated Outfit..!')
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };
  const handleViewOrders = () => {
    navigate('/TailoringMyOrders');
  };

  return (
    <div>
    <div>
        <Navi/>
      </div>

      <div class="sub-navi">
        <div class="search-container">
          
          <div class="search-bar-wrapper">

            {/* Search bar input section */}
            <input
              type="text"
              class="search-bar"
              placeholder="Search items..."
            />
          </div>
        </div>

        <Link to={`/MenCloths`}>
          <div class="cloth-type">Men</div>
        </Link>

        <Link to={`/WomenCloths`}>
          <div class="cloth-type">Women</div>
        </Link>

        <Link to={`/KidsCloths`}>
          <div class="cloth-type">Kids & Baby</div>
        </Link>
          
          <div class="cloth-type cloth-suggesions">Suggesions</div>

        <Link to={`/TailoringUI`}>
          <div class="cloth-type">Custom Tailoring</div>
        </Link>
      </div>
      
      <div className="tailoring-container">
          <div className="my-orders-box">
            <div className="box-content">
              <FontAwesomeIcon icon={faUser} className="user-icon" />
              <h2 className="box-title">My Orders</h2>
              <p className="box-description">View and manage your tailoring orders with ease. Check your order status, make changes, and more.</p>
              <div className="button-container">
                <button className="view-orders-btn" onClick={handleViewOrders}>
                  <FontAwesomeIcon icon={faBox} className="box-icon" />
                  View Orders
                </button>
              </div>
            </div>
        </div>
        <div className="form-container1">
          <h1 className="form-title">Custom Tailoring</h1>
          <form onSubmit={handleSubmit} className="custom-tailoring-form">

            <label htmlFor="country">Custom Tailoring Order ID:</label>
            <input
              type="number"
              id="tid"
              value={tid}
              onChange={(e) => setTid(e.target.value)}
              className="form-input"
              readOnly
            />

            <label htmlFor="country">Select Your Country:</label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-input"
              placeholder="Select a country"
            >
              <option value="">Select a country</option>
              {countries.map(({ name, flag }) => (
                <option key={name} value={name}>
                  <img src={flag} alt={name} className="country-flag" />
                  {name}
                </option>
              ))}
            </select>

            <fieldset className="gender-group">
              <legend>Select Your Gender:</legend>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="man"
                  checked={gender === 'man'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="woman"
                  checked={gender === 'woman'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === 'other'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Other
              </label>
            </fieldset>

            <label htmlFor="desiredOutfit">Describe Your Desired Outfit:</label>
            <textarea
              id="desiredOutfit"
              value={desiredOutfit}
              onChange={(e) => setDesiredOutfit(e.target.value)}
              className="form-input"
              placeholder="Describe the outfit you want"
            />

            <label htmlFor="negativeOutfit">Describe Your Negative Outfit:</label>
            <textarea
              id="negativeOutfit"
              value={negativeOutfit}
              onChange={(e) => setNegativeOutfit(e.target.value)}
              className="form-input"
              placeholder="Describe what you do not want"
            />

            <label htmlFor="negativeOutfit">Enter Quntity:</label>
            <input
              type="number"
              id="qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="form-input"
              placeholder="Enter Quntity"
            />

            <button type="submit" className="submit-button">Generate Outfit</button>
          </form>

          <div style={{ color: "#000000" }}>
                {loading && <LinearProgress />}
            </div>

          {/* Picture Box */}
          <div className="picture-box">
              {responseLink ? (
                <div className="picture-container">
                  <img src={responseLink} alt="Generated Outfit" className="outfit-images" />
                  
                </div>
              ) : (
                <div className="empty-message">
                  <p>No image generated yet. Please submit the form to see the result.</p>
                </div>
              )}
            </div>
            

            <div className="button-container">
              <button onClick={handleRequestOutfit} className="request-button">Request Outfit</button>
              <button onClick={handleRegenerate} className="regenerate-button">Regenerate</button>
            </div>
            
        </div>
        </div>
    <div>
        <Foot/>
      </div>
      </div>
  );
};

export default CustomTailoringForm;
