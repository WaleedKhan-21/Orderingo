import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Headerlogo from "../Assets/header.png";
import "../Login/main.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Icon from 'react-bootstrap-icons';
function Login() {
    let navigate = useNavigate();
    const [visibleText, setVisibleText]=useState(false);
    const handleEye=()=>{
      setVisibleText((prevState => (
          !prevState
        )));
  }
    const LoginSchema = yup.object({
        // vendorCode: yup.string().required(),
        identifier: yup
        .string()
        .email("Field should contain a valid e-mail")
        .max(255)
        .required("Please Enter your user name"),

    }).required();
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(LoginSchema)
    });
    const handler = async (e) => {
   

        const payload = {
              identifier: e.identifier,
                password: e.password
          
        }
        await axios.post('http://localhost:1337/auth/local', payload)
        .then(res => {
            console.log("res",res)
            localStorage.setItem('id',res.data.user.id)
            localStorage.setItem('status',res.data.user.profileStatus)
            localStorage.setItem('userName',res.data.user.username)
            localStorage.setItem('token',res.data.jwt)
            navigate("/profile")
        }
        ).catch(err => {
            if(err.response.data.data[0].messages[0].message === "Identifier or password invalid."){
                toast.error(err.response.data.data[0].messages[0].message)
                console.log(err.response.data.data[0].messages[0].message)
            }
            else{
                toast.error("error")
            }
          
        })
      
    
    }
       
    return (

        <div class="wrapper">
             <ToastContainer />
            <div class="logo">
                <img src={Headerlogo} alt="" />
            </div>
            {/* <div class="text-center mt-4 name">
                Orderingo 
            </div> */}
            <form onSubmit={handleSubmit(handler)} class="p-3 mt-3">
                <div class="form-field d-flex align-items-center">
                    <span class="far fa-user"></span>
                    <input  type="text" {...register("identifier")}   id="userName" placeholder="Username" />
                   
                </div>
                <div className="register-error">{errors.identifier && <p>{errors.identifier.message}</p>}</div>
                <div class="form-field d-flex align-items-center">
                    <span class="fas fa-key"></span>
                    <input type={visibleText?"text":"password"} {...register("password")}  id="pwd" placeholder="Password" />
                    <span className="eye-lash" onClick={handleEye}><Icon.EyeSlash /></span>
                </div>
                <button type='submit' class="btn mt-3">Login</button>
            </form>
            <div class="text-center fs-6">
                <a href="/reset">Forget password?</a> or <Link to="/register"><a href="">Sign up</a></Link>
            </div>
        </div>
    )
}

export default Login