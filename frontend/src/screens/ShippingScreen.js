import React from 'react'
import { useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import { useNavigate } from 'react-router-dom'

const ShippingScreen = () => {

    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { ShippingAddress } = cart

    const [address, setAddress] = useState(ShippingAddress.address)
    const [city, setCity] = useState(ShippingAddress.city)
    const [postalCode, setPostalCode] = useState(ShippingAddress.postalCode)
    const [country, setCountry] = useState(ShippingAddress.country)


    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>

                <FormGroup controlId='address'>
                    <FormLabel>Address</FormLabel>
                    <FormControl type='text' placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)}></FormControl>
                </FormGroup>

                <FormGroup controlId='city'>
                    <FormLabel>City</FormLabel>
                    <FormControl type='text' placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)}></FormControl>
                </FormGroup>

                <FormGroup controlId='postalCode'>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl type='text' placeholder='Enter Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></FormControl>
                </FormGroup>

                <FormGroup controlId='country'>
                    <FormLabel>Country</FormLabel>
                    <FormControl type='text' placeholder='Enter Country' value={country} onChange={(e) => setCountry(e.target.value)}></FormControl>
                </FormGroup>
                <Button type='submit' variant='primary'> Continue </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
