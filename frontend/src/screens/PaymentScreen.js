import React from 'react'
import { useState } from 'react'
import { Button, Form, FormGroup, FormLabel, Col, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {

  const navigate = useNavigate()

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    navigate('/shipping')
  }


  const [paymentMethod, setPaymentMethod] = useState('PayPal')


  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1={true} step2={true} step3={true} ></CheckoutSteps>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>

        <FormGroup className='py-3'>
          <FormLabel as='legend'>Select Method</FormLabel>
          <Col>
            <FormCheck type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentmethod' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)}></FormCheck>
            {/* <FormCheck type='radio' label='Stripe' id='Stripe' name='paymentmethod' value='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></FormCheck> */}
          </Col>
        </FormGroup>


        <Button type='submit' variant='primary' className='py-3'> Continue </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
