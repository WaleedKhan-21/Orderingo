import React, {useEffect} from 'react'
import SideMenu from '../SIdeMenu/SideMenu'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/dropdowns';
const OrderManage = (child) => {
    const { data, error, loading } = useFetch(`http://localhost:1337/orders/${localStorage.getItem("id")}`);
    let navigate = useNavigate();
    console.log(data)
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
            <h1>Order Management</h1>
        </div>
        
        
        <div class="clearfix"></div>
        
        <div class="row rel-row">
            <div class="d-none d-lg-block side-menu col-lg-3 col-6">
                
               <SideMenu child={child}/>
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
                                <th>Order #</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Delivery/<br/>Pickup</th>
                                {/* <th>Delivery Address</th>
                                <th>Delivery/<br/>Pickup Day</th> */}
                                <th>Total Bill</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        {data.length !== 0?
                                <tbody>
                                    {data?.map((_) => {
                                        return (<tr>
                                            <td data-title="Order #">{_.id}</td>
                                            <td data-title="First Name">{_.customer?.FirstName}</td>
                                            <td data-title="Last Name">{_.customer?.LastName} </td>
                                        <td data-title="Delivery Pickup">{_?.delivery_date?.substring(0,10)}</td>
                                         {/* <td data-title="Delivery Address"></td> */}
                                        {/* <td></td> */}
                                            {/* <td data-title="Delivery Pickup Day"></td> */}
                                 <td data-title="Total Bill">{_?.total_amount}</td>
                                            <td data-title="Details"><p role='button' onClick={()=>{navigate("/cataloge");}}>Click Here</p></td>
                                        </tr>)
                                    })}
                                </tbody> : 
                                <tbody className='blackTable'>
                               <tr>
                                        <td data-title="Order #"></td>
                                        <td data-title="First Name"></td>
                                        <td data-title="Last Name"> no record to show</td>
                                        <td data-title="Delivery Pickup"></td>
                                         {/* <td data-title="Delivery Address"></td> */}
                                        {/* <td></td> */}
                                            {/* <td data-title="Delivery Pickup Day"></td> */}
                                 <td data-title="Total Bill"></td>
                                        <td data-title="Details"></td>
                                        
                                    </tr>
                            </tbody> }
                        {/* <tbody>
                            <tr>
                                 <td data-title="Order #">9000-2536-6</td>
                                 <td data-title="First Name">Michael </td>
                                 <td data-title="Last Name">Jay</td>
                                 <td data-title="Delivery Pickup">Delivery</td>
                                 <td data-title="Delivery Address">342 Huron, ON</td>
                                 <td data-title="Delivery Pickup Day">3/01/2021</td>
                                 <td data-title="Total Bill">$32</td>
                                 <td data-title="Details"><a href="javascript:void(0);">Click Here</a></td>
                            </tr>
                            <tr>
                                <td data-title="Order #">9000-2536-6</td>
                                <td data-title="First Name">Michael </td>
                                <td data-title="Last Name">Jay</td>
                                <td data-title="Delivery Pickup">Delivery</td>
                                <td data-title="Delivery Address">342 Huron, ON</td>
                                <td data-title="Delivery Pickup Day">3/01/2021</td>
                                <td data-title="Total Bill">$32</td>
                                <td data-title="Details"><a href="javascript:void(0);">Click Here</a></td>
                           </tr>
                           <tr>
                            <td data-title="Order #">9000-2536-6</td>
                            <td data-title="First Name">Michael </td>
                            <td data-title="Last Name">Jay</td>
                            <td data-title="Delivery Pickup">Delivery</td>
                            <td data-title="Delivery Address">342 Huron, ON</td>
                            <td data-title="Delivery Pickup Day">3/01/2021</td>
                            <td data-title="Total Bill">$32</td>
                            <td data-title="Details"><a href="javascript:void(0);">Click Here</a></td>
                       </tr>
                       <tr>
                        <td data-title="Order #">9000-2536-6</td>
                        <td data-title="First Name">Michael </td>
                        <td data-title="Last Name">Jay</td>
                        <td data-title="Delivery Pickup">Delivery</td>
                        <td data-title="Delivery Address">342 Huron, ON</td>
                        <td data-title="Delivery Pickup Day">3/01/2021</td>
                        <td data-title="Total Bill">$32</td>
                        <td data-title="Details"><a href="javascript:void(0);">Click Here</a></td>
                   </tr>
                        </tbody> */}
                    </table>

                    
                    

                    

                    
                    
                    <br/>
                    <br/>
                    {/* <div class="all-btns float-end">
                        <a class="orange-bg btn-style cancel-btn" href="javascript:void(0);">
                            Cancel
                        </a>
                        <a class="orange-bg btn-style"  href="javascript:void(0);">
                            Add
                        </a>
                    </div> */}
                    
                    
                    
                </div>
                

            </div>
        </div>
        
    </div>
    
</div>
  )
}

export default OrderManage