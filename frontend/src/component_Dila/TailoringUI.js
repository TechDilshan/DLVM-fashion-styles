import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS_C/TailoringUI.css';
import Navi from '../Navi';
import Foot from '../footer';
import Axios from 'axios';

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
  const [tid, setTid] = useState('pending');

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(desiredOutfit,gender,country, negativeOutfit);

    try {
      const formData = new FormData();
      formData.append('outfit', desiredOutfit);
      formData.append('gender', gender);
      formData.append('country', country);
      formData.append('negative', negativeOutfit);
      formData.append('email', 'rqfhmzpkqyjddphwjo@nbmbb.com');
      formData.append('password', 'abcdef');

      const response = await axios.post('https://thenewblack.ai/api/1.1/wf/clothing', formData);


      const link = response.data; // Adjust according to actual API response
      setResponseLink(link);

      // Log the response link to the console
      console.log('Generated Outfit Link:', link);
      
    } catch (error) {
      console.error('Error submitting form data', error);
    }
  };

  const handleRegenerate = () => {
    // Reload the page
    window.location.reload();
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
        console.error('Done');
      })
      .catch((error) => {
        console.error('Axios Error: ', error);
      });
  };

  return (
    <div>
    <div>
        <Navi/>
      </div>
    <div className="form-container">
      <h1 className="form-title">Custom Tailoring</h1>
      <form onSubmit={handleSubmit} className="custom-tailoring-form">
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



      {/* Picture Box */}
      <div className="picture-box">
          {responseLink ? (
            <div className="picture-container">
              <img src={responseLink} alt="Generated Outfit" className="outfit-image" />
              
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
    <div>
        <Foot/>
      </div>
    </div>
  );
};

export default CustomTailoringForm;
