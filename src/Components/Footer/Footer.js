import React from 'react'
import logo from "../Assets/Footer_logo.svg"

const Footer = () => {
  return (
    <div class="footer-sec">
    <div class="container">
        <div class="upper-ft">
            <div class="ft-logo float-start"><a href="javascript:void(0);"><img class="img-fluid"  src={logo} alt="logo" /></a></div>
            <div class="sm-links float-end">
                <ul class="sm-links-list">
                    <li><a class="fb" href="javascript:void(0);"></a></li>
                    <li><a class="tw" href="javascript:void(0);"></a></li>
                    <li><a class="inst" href="javascript:void(0);"></a></li>
                </ul>
            </div> 
        </div>
        <div class="lower-ft">
            <p class="float-start">© 2021 Orderingo.  All rights reserved.</p>
            <ul class="ft-links float-end">
                <li><a href="javascript:void(0);">Privacy</a></li>
                <li><a href="javascript:void(0);">Terms</a></li>
                <li><a href="javascript:void(0);">Contact</a></li>
            </ul>
        </div>
    </div>
</div>
  )
}

export default Footer