import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import {useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";
import SideMenu from '../SIdeMenu/SideMenu';
import UserForm from './UserForm';

const Profile = (child) => {
   
    let navigate = useNavigate();
    const profileSchema = yup.object({
        // VendorCode: yup.string().required('Please Enter your Vendor Code').nullable(),
        username: yup.string().required('Please Enter your User Name').nullable(),
        FirstName: yup.string().required('Please Enter your First Name').nullable(),
        LastName: yup.string().required('Please Enter your Last Name').nullable(),
        Cellphone: yup.string().required('Please Enter your Cellphone').nullable(),
        IneracEmail: yup.string().required('Please Enter your IneracEmail').nullable(),
        Homephone: yup.string().required('Please Enter your Homephone').nullable(),
        StoreName: yup.string().required('Please Enter your StoreName').nullable(),
        cooking_experience: yup.string().required('Please Enter your Cooking Experience').nullable(), 
        secondaryContact:yup.string().required('Please Enter your Secondary Contact').nullable(),
        addresses:yup.string().required('Required').nullable(),
        unitNo:yup.string().required('Required').nullable(),
        province:yup.string().required('Required').nullable(),
        postalCode:yup.string().required('Required').nullable(),
        city:yup.string().required('Required').nullable(),
        secondaryContactsPhone:yup.string().required('Required').nullable(),
        preferred_categories: yup.array().min(1, "preferred_categories are required").required("required"),
        promotion_type: yup.array().min(1, "promotion_type are required").required("required"),
        // delivery_days: yup.array().min(1, "delivery days are required").required("required"),
        delivers:yup.string().required("One of two is required").nullable(),
        delivers2:yup.string().required("One of two is required").nullable(),
        sameAsHome:yup.boolean().oneOf([true],'Required'),
        email: yup
        .string()
        .email("Field should contain a valid e-mail")
        .max(255)
        .required("Please Enter your email").nullable(),
    //     password: yup
    //     .string()
    //     .required("Please Enter your password")
    //     .matches(
    //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //       "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    //     ),
    //     confirmPassword: yup.string()
    //  .oneOf([yup.ref('password'), null], 'Passwords must match')
    }).required();
    const { register, handleSubmit, formState: { errors }, control,setValue,reset } = useForm({
        resolver: yupResolver(profileSchema),
 defaultValues: {
    
     

          }
        
    });

    useEffect(() => {
        console.log(localStorage.getItem("token"))
        if(localStorage.getItem("token")){
            console.log("profile landing")
        } else {
            localStorage.clear();
            navigate("/");
        }
      },[]);
      

    useEffect(() => {
      axios.get(`http://localhost:1337/users/${localStorage.getItem('id')}`).then((res) => {
        reset(res.data);
        console.log(res.data.store)
        axios.get(`http://localhost:1337/stores/${res?.data?.store?.id}`).then((res) => {
            console.log(res.data)
            reset(res.data)
            
           
        }).catch((err) => {
            console.log(err)
        })
         
        }).catch((err) => {
            console.log(err);
        })


        // axios.get(`http://localhost:1337/users`).then((res) => {
        //     reset(res.data);
        //     console.log(res.data.store)
        //     axios.get(`http://localhost:1337/stores`).then((res) => {
        //         console.log(res.data)
        //         reset(res.data)
                
               
        //     }).catch((err) => {
        //         console.log(err)
        //     })
             
        //     }).catch((err) => {
        //         console.log(err);
        //     })

        

    }, [])
    

    // setValue([{'username', 'test'}]);
    const handler = async (e) => {
      
         console.log("e.VendorCode", e.VendorCode)
         const code = localStorage.getItem("vendorCode")
        const payload = {

            VendorCode: code? code :e.VendorCode,
            username: e.username,
            FirstName: e.FirstName,
            LastName: e.LastName,
            email: e.email,
           /* A validation for the password. */
            // password: e.password,
            // confirmPassword: e.confirmPassword,
            Cellphone: e.Cellphone,
            Homephone: e.Homephone,
            IneracEmail: e.IneracEmail,
            store: "34",
            addresses: [
                e.addresses 
            ],
            provider: 'local',
            resetPasswordToken: "string",
            confirmationToken: "string",
            confirmed: false,
            blocked: false,
            role: "string",
            DOB: "string",
            documentsRequired: true,
            user_types: [
                "string"
            ],
            orders: [
                "string"
            ],
            created_by: "string",
            updated_by: "string"
        }
console.log (e)
        const storePayload = {
            StoreName: e.StoreName,
            cooking_experience: e.cooking_experience,
            preferred_categories: e.preferred_categories,
            delivers_area: [
               e.delivers_area
              ],
              delivery_days:e.delivery_days,
              promotion_type: e.promotion_type
        }
        var config = {
            method: 'put',
            url: 'http://localhost:1337/users/63',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : payload
          };
    
        await axios.post('http://localhost:1337/stores', storePayload)
            .then(async res => {
                console.log("res",res)
                await axios.put(`http://localhost:1337/users/${localStorage.getItem('id')}`,{...payload,store:res.data.id} )
               .then(res => {
                console.log("resp",res)
                    console.log(res)    
                }).catch(err => {
                    console.log(err)
                }
                )
                // navigate("/details")
                toast.success("Have Patience profile sent for approval")
            }
            ).catch(err => {
                console.log(err)
            })
  
    }
 
    return (
        <div>
            	<ToastContainer />
            <div class="body-wrapper">
                <div class="clearfix"></div>
                <div class="content-container">
                    <div class="container">
                        <div class="heading-bx float-start">
                            <h1>Vendor Registration</h1>
                        </div>
                        <div class="status-bx">
                            <p>Status: <span class="in-progress"> In Progress</span></p>
                        </div>
                        <div class="clearfix"></div>
                        <div class="row rel-row">
                            <div class="d-none d-lg-block side-menu col-lg-3 col-6">
                                <SideMenu child={child} />
                            </div>
                            <div class="col-lg-9 col-12 hamb-col vendor-col">
                                <a class="hamburger-icon2" href="javascript:void(0);"><span></span><span></span><span></span></a>
                                <div class="reg-form reg-form2 w90">
                                    <UserForm control={control} errors={errors} onSubmit={handleSubmit(handler)} register={register}   />
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
export default Profile