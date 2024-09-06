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
import TailoringUI from './component_Dila/TailoringUI';
import TailoringDisplay from './component_Dila/TailoringDisplay';
import TailoringMyOrders from './component_Dila/TailoringMyOrders';



//Limasha
import ShoppingCart from './component_Lima/ShoppingCart';


//Vihanga
import Login from './component_vihanga/login';


//Malmi
import Payment from './component_Malmi/Payment';
import PaymentList from './component_Malmi/PaymentList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <Routes>
{/* Component Dilashan */}
        <Route path='/' element={<App />} />
        <Route path='/users' element={<Users />} />
        <Route path='/AdminDisplay' element={<AdminDisplay />} />
        <Route path='/UserHome_C' element={<UserHome />} />
        <Route path='/ProductDetails_C' element={<ProductDetails />} />
        <Route path='/MenCloths' element={<MenCloths />} />
        <Route path='/WomenCloths' element={<WomenCloths />} />
        <Route path='/KidsCloths' element={<KidsCloths />} />
        <Route path='/TailoringUI' element={<TailoringUI />} />
        <Route path='/TailoringDisplay' element={<TailoringDisplay />} />
        <Route path='/TailoringMyOrders' element={<TailoringMyOrders />} />

{/* Component Limasha */}
        <Route path='/ShoppingCart' element={<ShoppingCart />} />

{/* Component Vihanga */}
        <Route path='/Login' element={<Login />} />

{/* Component Malmi */}
<Route path="/Payment" element={<Payment />} />
<Route path="/PaymentList" element={<PaymentList />} />

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
