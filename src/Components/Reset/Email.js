import React from 'react'
import {Form,Button} from "react-bootstrap"
import './custom.css'

const Email = ()=>{
    return (
        <>
        <div className="CustomContainer">
        <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" placeholder="First Name" />
  
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" placeholder="Last Name " />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Store Name</Form.Label>
    <Form.Control type="text" placeholder="Store Name" />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Phone NO</Form.Label>
    <Form.Control type="number" placeholder="phone no" />
  </Form.Group>
  
  
  <Button variant="primary" type="submit" className='btn'>
    Next
  </Button>
</Form>
        </div>
        </>
    )
}
export default Email