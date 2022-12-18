import React, {useEffect} from 'react'
import SideMenu from '../SIdeMenu/SideMenu'
import axios from 'axios'
import useFetch from '../../hooks/dropdowns';
import { useNavigate } from 'react-router-dom';
const OfferDetails = () => {
    
    const { data, error, loading } = useFetch('http://localhost:1337/promotions');
    console.log(data)
    let navigate = useNavigate();
    useEffect(() => {
        console.log(localStorage.getItem("token"))
        if(localStorage.getItem("token")){
            console.log("profile landing")
        } else {
            localStorage.clear();
            navigate("/");
        }
      },[]);
    return (
        <div class="content-container">
            <div class="container">
                <div class="heading-bx float-start">
                    <h1>Offer Details</h1>
                </div>
                <div class="clearfix"></div>
                <div class="row rel-row">
                    <div class="d-none d-lg-block side-menu col-lg-3 col-6">

                        <SideMenu />
                    </div>
                    <div class="col-lg-9 col-12 hamb-col vendor-col">
                        <a class="hamburger-icon2" href="javascript:void(0);"><span></span><span></span><span></span></a>
                        <div class="reg-form">

                            {/* <div class="select-d-time float-end">
                                <label>Order Status</label>
                                <select class="form-control float-end">
                                    <option>Confirmed</option>
                                    <option>Delivered</option>
                                    <option>In Progress</option>
                                </select>
                            </div> */}

                            <table class="fancy-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>type</th>
                                        <th>Days</th>
                                        <th>Availability</th>
                                        <th>Image</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((_) => {
                                        return (<tr>
                                            <td data-title="Order #">{_.name}</td>
                                            <td data-title="First Name">{_.isActive ? "Active" : "Not Ative"}</td>
                                            <td data-title="Last Name">{_.promotion_types?.map((_) => {
                                                return `${_.name} `
                                            })}</td>
                                            <td data-title="Delivery Pickup">{_.delivery_days?.map((_) => {
                                                return `${_.DaysName} `
                                            })}</td>
                                            <td></td>
                                            <td><img style={{ width: '40px' }} src={`http://localhost:1337${_?.offerimage?.url}`} alt="alt image" class="rounded-circle" /></td>

                                        </tr>)
                                    })}
                                </tbody>
                            </table>

                            <br />
                            <br />
                            <div class="all-btns float-end">
                                <a class="orange-bg btn-style cancel-btn" href="javascript:void(0);">
                                    Cancel
                                </a>
                                <a class="orange-bg btn-style" href="javascript:void(0);">
                                    Add
                                </a>
                            </div>



                        </div>


                    </div>
                </div>

            </div>

        </div>
    )
}

export default OfferDetails