import React, { useState, useEffect } from 'react';
import Headerlogo from "../Assets/header.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
    let navigate = useNavigate();
    const [userName, setUserName] = useState()
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }
    useEffect(() => {
        console.log("UserName",localStorage.getItem("userName"));
        setUserName(localStorage.getItem("userName"))
      },[]);
  return (
    <div class="header-container">
        <div class="container">

            <div class="logo-wrapper float-start">
                <a href="/profile"><img src={Headerlogo} /></a>
            </div>
                      <div class="float-start header-search-container">
                
                {/* <div class="menu-bx">
                    <div class="form-check float-start">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="Daily"/>
                        <label class="form-check-label" for="Daily">
                            Daily Menu
                        </label>
                      </div>
                      <div class="form-check float-start">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="Weekly" checked/>
                        <label class="form-check-label" for="Weekly">
                            Weekly Menu
                        </label>
                      </div>
                </div> */}

                {/* <div class="header-addressbar float-end">
                    <p>{userName}</p>
                </div> */}

                {/* <div class="search-bx float-start search-bx-hd">
                    <div class="search-icon"></div>
                    <input class="input-txt" type="text" placeholder="Search Dish, Cuisine experts" />
                    <input class="submit-btn" type="submit" value="" />
                </div> */}

            </div>
            

            <div class="header-right-sec float-end">
                <ul class="header-list">
                    {/* <li><a href="javascript:void(0);">Sign In</a></li> */}
                    <li >{userName}</li>
                    <li onClick={handleLogout}>Sign Out</li>
                </ul>
            </div>
           {/* <div class="dropdown-bx">
                <select>
                    <option>Daily Menu</option>
                    <option>Weekly Menu</option>
                </select>
            </div>  */}
        </div>
        <a class="down-arrow" href="javascript:void(0);"></a>
    </div>
  )
}

export default Header