import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


//Dilshan
import Users from './component_Dila/Users';
import AdminDisplay from './component_Dila/AdminDisplay';
import UserHome from './component_Dila/UserHome_C';
import ProductDetails from './component_Dila/ProductDetails_C';
import MenCloths from './component_Dila/MenCloths';
import WomenCloths from './component_Dila/WomenCloths';
import KidsCloths from './component_Dila/KidsCloths';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <Routes>
        <Route path='/' element={<App />} />
        <Route path='/users' element={<Users />} />
        <Route path='/AdminDisplay' element={<AdminDisplay />} />
        <Route path='/UserHome_C' element={<UserHome />} />
        <Route path='/ProductDetails_C' element={<ProductDetails />} />
        <Route path='/MenCloths' element={<MenCloths />} />
        <Route path='/WomenCloths' element={<WomenCloths />} />
        <Route path='/KidsCloths' element={<KidsCloths />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
