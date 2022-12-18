import React,{useState, useEffect} from 'react'
import {Link} from "react-router-dom"

const SideMenu = (child) => {
  const [status, setStatus] = useState(localStorage.getItem('status'))
  const [activeClass, setActiveClass] = useState(0);
  useEffect(() => {
    console.log("child", child.child.child)
    if (child.child.child === "profile") {
      setActiveClass(1)
    } else if (child.child.child === "catalogye") {
      setActiveClass(3)
    } else if (child.child.child === "oferTable") {
      setActiveClass(5)
    } else if (child.child.child === "orderManage") {
      setActiveClass(6)
    } else if (child.child.child === "details") {
      setActiveClass(2)
    } else {
      setActiveClass(0)
    }
  }, [child]);

  return (
    <div class="side-menu-container inner">
                        <ul class="side-menu-list">
                            <Link  to="/profile">
                            <li><a class={activeClass===1?"active":""}>My Profile</a></li></Link>
                              <Link  to="/details">
                                
                            <li><a class={activeClass===2?"active":""} >Menu Details</a></li></Link>
                            <Link  to="/cataloge">
                            <li><a class={activeClass===3?"active":""}>Menu/Cataloge</a></li></Link>
                            {/* <Link  to="/offer-details">
                            <li><a class={activeClass===4?"active":""}>Offer Details</a></li></Link> */}
                            <Link  to="/ofer">
                            <li><a class={activeClass===5?"active":""}>Offerings</a></li></Link>
                            <Link  to="/odermanage">
                            <li><a class={activeClass===6?"active":""}>Order Management</a></li></Link>
                            {/* <Link  to="/accounts"> */}
                                <li><a href="javascript:void(0);">Accounts</a></li>
                            {/* <Link style={{pointerEvents:status != "Approved" && "none"}} to="/details">
                            <li><a href='#'>Menu Details</a></li></Link>
                            
                            <Link style={{pointerEvents:status != "Approved" && "none"}} to="/cataloge">
                            <li><a href=''>Menu/Cataloge</a></li></Link>
                            <Link style={{pointerEvents:status != "Approved" && "none"}} to="/offer-details">
                            <li><a href='#'>Offer Details</a></li></Link>
                            <Link style={{pointerEvents:status != "Approved" && "none"}} to="/ofer">
                            <li><a href=''>Offerings/Time Table</a></li></Link>
                            <Link style={{pointerEvents:status != "Approved" && "none"}} to="/odermanage">
                            <li><a href="#">Order Management</a></li></Link>
                            <Link style={{pointerEvents:status != "Approved" && "none"}} to="/accounts">
                            <li><a href="#">Accounts</a></li></Link> */}
                            <li><a href="javascript:void(0);">Customer Enguiries</a></li>
                            <li><a href="javascript:void(0);">Tickets</a></li>
                            
                        </ul>
                        
                    </div>
  )
}

export default SideMenu