import React, { useState } from 'react'
import { Form, FormControl, FormLabel } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (

        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl type='email' placeholder='Enter email'></FormControl>
                </Form.Group>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
