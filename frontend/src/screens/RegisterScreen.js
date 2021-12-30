import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Col, Form, FormControl, FormLabel, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userAction'

const RegisterScreen = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('password do not match')
        } else {

            dispatch(register(name, email, password))
        }
    }

    return (

        <FormContainer>

            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <FormLabel>Name</FormLabel>
                    <FormControl type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></FormControl>
                </Form.Group>
                <Form.Group controlId='email'>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign Up
                </Button>

                <Row>
                    <Col>
                        Have an Account?{' '}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}> Login </Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
