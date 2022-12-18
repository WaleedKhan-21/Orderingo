import React, {useEffect} from 'react'
import SideMenu from '../SIdeMenu/SideMenu'
import image from "../Assets/upload-img.jpg";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/dropdowns';
import { ToastContainer, toast } from 'react-toastify';
const Details = (child) => {
    const { data, error, loading } = useFetch(`http://localhost:1337/products/${localStorage.getItem("id")}`);
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
    // let navigate = useNavigate();
    // const DetailsSchema = yup.object({
    //     // productName: yup.string().required(),

    // }).required();
    // const { register, handleSubmit, formState: { errors }, control } = useForm({
    //     resolver: yupResolver(DetailsSchema)
    // });
    // useEffect(() => {
    //     console.log(localStorage.getItem("token"))
    //     if(localStorage.getItem("token")){
    //         console.log("profile landing")
    //     } else {
    //         localStorage.clear();
    //         navigate("/");
    //     }
    //   },[]);
    // //APIS
    // const handler = async (data) => {
    //     const { productName, Price } = data;
   
    //     const productPayload = {

    //         productName,
    //         Price
    //     }
    //     const promotionPayload = {
    //         promotion_types: data.promotion_types
    //     }

    //     await axios.post('http://localhost:1337/products', productPayload).then(res => {
    //         console.log(res)
    //         localStorage.setItem("dishName", productName);
    //         localStorage.setItem("dishPrice", Price);
            
    //     }).catch(err => {
    //         // alert(err.message)
    //         if(err.response.data.message === "ValidationError"){
    //             toast.error("Kindly Enter correct product name and price")
    //             console.log("err.message",err.response.data.message)
    //         }else{
    //             toast.error(err.response.data.message)
    //             console.log("err.message",err.response.data.message)
    //         }
           
    //     }
    //     )
    //     await axios.post('http://localhost:1337/promotions', promotionPayload).then(res => {
    //         localStorage.setItem("promotion_types", data.promotion_types);

    //         console.log(res)
    //         console.log("data saved successfully")

    //         if(data.promotion_types?.includes("Weekly") ||data.promotion_types?.includes("Special")){

    //         navigate("/ofer")
    //         }
    //         else{
    //             navigate("/cataloge")
    //         }
    //     }).catch(err => {
    //         console.log(err)
    //     }
    //     )


    // }

    return (
        <div class="content-container">
            <div class="container">
                <div class="heading-bx float-start">
                    <h1>Menu Details</h1>
                </div>
                <div class="clearfix"></div>
                <div class="row rel-row">
                    <div class="d-none d-lg-block side-menu col-lg-3 col-6">
                        <SideMenu child={child} />
                    </div>
                    <div class="col-lg-9 col-12 hamb-col vendor-col">
                        <a class="hamburger-icon2" href="javascript:void(0);"><span></span><span></span><span></span></a>
                       
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
                                    <th>Image</th>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>type</th>
                                        <th>Days</th>
                                        <th>Product Price</th>
                                        {/* <th>Availability</th> */}
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                {data.length !== 0?
                                <tbody>
                                    {data?.map((_) => {
                                        return (<tr>
                                            <td><img style={{ width: '40px' }} src={`http://localhost:1337${_?.productimagee?.url}`} alt="alt image" class="rounded-circle" /></td>
                                            <td data-title="Order #">{_.productName}</td>
                                            <td data-title="First Name">{_.isActive ? "Active" : "Not Ative"}</td>
                                            <td data-title="Last Name">{_.promotion_types?.map((_) => {
                                                return `${_.name} `
                                            })}</td>
                                            <td data-title="Delivery Pickup">{_.delivery_days?.map((_) => {
                                                return `${_.DaysName} `
                                            })}</td>
                                             <td>{_.Price}</td>
                                            {/* <td></td> */}
                                            <td data-title="Details"><p role='button' onClick={()=>{navigate("/cataloge");}}>Click Here</p></td>
                                        </tr>)
                                    })}
                                </tbody> : 
                                <tbody className='blackTable'>
                               <tr>
                                        <td></td>
                                        <td data-title="Order #"></td>
                                        <td data-title="First Name"></td>
                                        <td data-title="Last Name"> no record to show</td>
                                        <td data-title="Delivery Pickup"></td>
                                         <td></td>
                                        {/* <td></td> */}
                                        <td data-title="Details"></td>
                                    </tr>
                            </tbody> }
                            </table>
                                 
                    {/* <table class="fancy-table">
                        <thead>
                            <tr>
                                <th>Product Page</th>
                                <th>Product Price</th>
                                <th>Image</th>
                                <th>Promotion Type</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                 <td data-title="Delivery Pickup">Delivery</td>
                                 <td data-title="Delivery Address">342 Huron, ON</td>
                                 <td data-title="Delivery Pickup Day">3/01/2021</td>
                                 <td data-title="Total Bill">$32</td>
                                 <td data-title="Details"><p role='button' onClick={()=>{navigate("/cataloge");}}>Click Here</p></td>
                            </tr>
                  
                        </tbody>
                    </table> */}
                                <br />
                                <br />
                                <div class="all-btns float-end">
                                <button class="orange-bg btn-style" onClick={() => navigate('/cataloge') }>
                                        Add Daily Menu
                                    </button >
                                    <button class="orange-bg btn-style" onClick={() => navigate('/ofer') }>
                                        Add Weekly Menu
                                    </button >
                                    <ToastContainer/>
                               
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details