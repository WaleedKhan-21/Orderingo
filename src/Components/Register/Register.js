import { yupResolver } from "@hookform/resolvers/yup";
import React,{useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Headerlogo from "../Assets/header.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Icon from 'react-bootstrap-icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../Register/register.css";
const Register = () => {
  let navigate = useNavigate();
  const [visibleText, setVisibleText]=useState(false);
 
  const handleEye=()=>{
    setVisibleText((prevState => (
        !prevState
      )));
}
useEffect(() => {

  localStorage.setItem("vendorCode",`ord-${Math.floor(Math.pow(10, 12) + Math.random() * (Math.pow(10, 13) - Math.pow(10, 12) - 1))}`)
 },[]);
  const RegisterSchema = yup
    .object({
      // vendorCode: yup.string().required(),
      FirstName: yup.string().required("Please Enter your first name"),
      LastName: yup.string().required("Please Enter your last name"),
      Cellphone: yup.string().required("Please Enter your phone number"),
      password: yup
        .string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      email: yup
        .string()
        .email("Field should contain a valid e-mail")
        .max(255)
        .required("Please Enter your email"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  const handler = async (data) => {
    console.log(data);
    const payload = {
      ...data,
      username: data.FirstName,
    };
    await axios
      .post("http://localhost:1337/auth/local/register", payload)
      .then(async (res) => {
        console.log("resp0nse",res)
        localStorage.setItem('id',res.data.user.id)
        localStorage.setItem('userName',res.data.user.username)
        localStorage.setItem('status',res.data.user.profileStatus)
        localStorage.setItem('token',res.data.jwt)
        await toast.success("Added User");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.response.data.data[0].messages[0].message)
        if(err.response.data.data[0].messages[0].message === "Email is already taken."){
            toast.error("Email is already taken.");
        }else{ 
            toast.error("error");
        }
      });
  };
  return (
    <div class="wrapper">
      <ToastContainer />

      <div class="logo">
        <img src={Headerlogo} alt="" />
      </div>
      {/* <div class="text-center mt-4 name">Orderingo</div> */}
      <form onSubmit={handleSubmit(handler)} class="p-3 mt-3">
        <div class="form-field d-flex align-items-center">
          <span class="far fa-user"></span>
          <input
            {...register("FirstName")}
            type="text"
            name="FirstName"
            id="userName"
            placeholder="First Name"
          />
        </div>
        <div className="register-error">{errors.FirstName && <p>{errors.FirstName.message}</p>}</div>
        <div class="form-field d-flex align-items-center">
          <span class="far fa-user"></span>
          <input
            {...register("LastName")}
            type="text"
            name="LastName"
            id="userName"
            placeholder="Last Name"
          />
        </div>
        <div className="register-error">{errors.LastName && <p>{errors.LastName.message}</p>}</div>
        <div class="form-field d-flex align-items-center">
          <span class="far fa-user"></span>
          <input
            {...register("Cellphone")}
            type="number"
            name="Cellphone"
            id="userName"
            placeholder="Phone Number"
          />
        </div>
        <div className="register-error">{errors.Cellphone && <p>{errors.Cellphone.message}</p>}</div>
        <div class="form-field d-flex align-items-center">
          <span class="fas fa-key"></span>
          <input
            {...register("password")}
            type={visibleText?"text":"password"}
            name="password"
            id="pwd"
            placeholder="Password"
          />
           <span className="eye-lash" onClick={handleEye}><Icon.EyeSlash /></span>
        </div>
        <div className="register-error">{errors.password && <p>{errors.password.message}</p>}</div>
        <div class="form-field d-flex align-items-center">
          <span class="fas fa-key"></span>
          <input
            {...register("email")}
            type="email"
            name="email"
            id="pwd"
            placeholder="Email"
          />
        </div>
        <div className="register-error">{errors.email && <p>{errors.email.message}</p>}</div>
        <button type="submit" class="btn mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
