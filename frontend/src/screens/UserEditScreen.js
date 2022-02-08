import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Form, FormControl, FormLabel, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails } from '../actions/userAction'

const UserEditScreen = () => {

    const params = useParams()

    const userId = params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [message, setMessage] = useState(null)

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails


    useEffect(() => {

        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }

    }, [dispatch, userId, user])

    const submitHandler = (e) => {
        e.preventDefault()

    }

    return (

        <>
            <Link to='/admin/userlist' className='btn btn-light my-3' >
                Go Back
            </Link>
            <FormContainer>

                <h1>Edit User</h1>
                {/* {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />} */}
                {loading
                    ? (<Loader></Loader>
                    ) : error ? (<Message variant='danger'>{error}</Message>
                    ) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <FormLabel>Name</FormLabel>
                                <FormControl type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></FormControl>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
                            </Form.Group>

                            <Form.Group controlId='isAdmin'>

                                <Form.Check type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>

                        </Form>
                    )
                }

            </FormContainer>
        </>

    )
}

export default UserEditScreen
