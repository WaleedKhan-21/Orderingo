import React from 'react'
import Catalogye from '../Cataloge/Catalogye'
import Profile from '../My-profile/Profile'
import OferTable from '../Offer-timetable/OferTable'
import OrderManage from '../Order_Management/OrderManage'
import {Route, Routes } from "react-router-dom";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Account from '../Accounts/Account'
import Details from '../Order-Details/Details'
import OfferDetails from '../Offer-Details/OfferDetails'
import Email from '../Reset/Home'
import Reset from '../Reset/Password'
import Login from '../Login/Login'
import {useLocation} from "react-router-dom";
import Register from '../Register/Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Paths = () => {
    const location = useLocation();
  return (
      <>
        <ToastContainer />
    
        {location.pathname === "/" ? null : <Header />  }
        
     
     
      <Routes> 
          <Route path="/" element={<Login/>}/>
          
          <Route path="/register" element={<Register/>}/>
          <Route  path="/profile" element={<Profile child="profile"/>}/>
          <Route path="/cataloge" exact element={<Catalogye child="catalogye"/>} />
          <Route  path="/ofer" exact element={<OferTable child="oferTable"/>}/>
          <Route path="/odermanage" exact element={<OrderManage child="orderManage"/>}/>
          <Route path="/accounts" exact element={<Account/>}/> 
          <Route path="/reset" exact element={<Email/>}/> 
          <Route path="/auth/reset-password/" exact element={<Reset/>}/> 

          <Route path="/details" exact element={<Details child="details"/>}/>
          <Route path="/offer-details"  exact element={<OfferDetails/>}/>
      </Routes>
      {location.pathname === "/" ? null : <Footer />}
    
      
    {/* <Register/> */}
      </>
    
  )
}

export default Paths