import React,{useState} from 'react'
import {Form ,Button} from "react-bootstrap"
import axios from 'axios'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './custom.css'

const Password = ()=>{
  const [pass, setPass] = useState()
  const [cpass, setCPass] = useState()
const code = useSearchParams()
const navigate = useNavigate()

console.log(window.location.search)

const query = new URLSearchParams(window.location.search);
const code1 = query.get('code');
  const handleSubmit = (e) => { 
    e.preventDefault()
    if(pass === cpass){
      axios.post('http://localhost:1337/auth/reset-password', {
        code:code1,
        password: pass,
        passwordConfirmation: cpass
      }).then(res => {
        toast.success("Password Changed")
        navigate("/")

      }).catch(err => {
        toast.error(err)
      })
    } else {
      toast.error("Passwords do not match")
    }
   }

    return (
        <>
     <div className='CustomContainer'>

     <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>New Password</Form.Label>
    <Form.Control onChange={e=>{setPass(e.target.value)}}  type="password" placeholder="New Password" />
  
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control onChange={e=>{setCPass(e.target.value)}} type="password" placeholder="Confirm Password" />
  </Form.Group>
 
  <Button onClick={e=>{handleSubmit(e)}} variant="primary" type="submit" class="btn">
  Next
  </Button>
</Form>

     </div>
        </>
    )
}
export default Password