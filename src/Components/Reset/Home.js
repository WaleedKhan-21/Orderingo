import React,{useState} from 'react'
import {Form,Button } from "react-bootstrap"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import './custom.css'



const Home = ()=>{
	const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const clickHandler =async (e) => {
    e.preventDefault() 
    await axios.post('http://localhost:1337/auth/forgot-password', {
      email
    }).then(res => {

			toast.success("Email sent")
			// navigate("/details")

		}).catch(err => {
			console.log(err)
		}
		)
   }
    return (
        <>
        <div  className="CustomContainer">

        <Form className="Form">
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control onChange = {e=>{
      setEmail(e.target.value)
    }} type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

 
  <Button onClick={e=>clickHandler(e)} variant="primary" type="submit">
    Next
  </Button>
</Form>
</div>
        </>
    )
}
export default Home