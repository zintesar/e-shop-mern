import React from 'react'
import { useState } from 'react'
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const ShippingScreen = () => {

    const navigate = useNavigate()

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')


    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <FormLabel>
                        <FormControl>

                        </FormControl>
                    </FormLabel>
                </FormGroup>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
