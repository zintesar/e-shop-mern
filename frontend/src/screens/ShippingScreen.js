import React from 'react'
import { useState } from 'react'
import FormContainer from '../components/FormContainer'

const ShippingScreen = () => {

    const navigate = useNavigate()

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')


    return (
        <FormContainer>

        </FormContainer>
    )
}

export default ShippingScreen
