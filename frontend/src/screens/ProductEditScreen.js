import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Form, FormControl, FormLabel, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = () => {

    const params = useParams()


    const productId = params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate


    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {

            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }



    }, [dispatch, navigate, productId, product, successUpdate])

    const submitHandler = (e) => {
        console.log('pressed');
        e.preventDefault()
        //update product
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock,
        }))

    }

    return (

        <>
            <Link to='/admin/productlist' className='btn btn-light my-3' >
                Go Back
            </Link>
            <FormContainer>

                <h1>Edit Product</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading
                    ? (<Loader></Loader>
                    ) : error ? (<Message variant='danger'>{error}</Message>
                    ) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <FormLabel>Name</FormLabel>
                                <FormControl type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></FormControl>
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <FormLabel>Price Address</FormLabel>
                                <FormControl type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></FormControl>
                            </Form.Group>

                            <Form.Group controlId='countInStock'>
                                <FormLabel>Count In Stock Address</FormLabel>
                                <FormControl type='number' placeholder='Enter Count In Stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></FormControl>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <FormLabel>Image</FormLabel>
                                <FormControl type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}></FormControl>
                            </Form.Group>

                            <Form.Group controlId='brand'>
                                <FormLabel>Brand</FormLabel>
                                <FormControl type='text' placeholder='Enter brand name' value={brand} onChange={(e) => setBrand(e.target.value)}></FormControl>
                            </Form.Group>

                            <Form.Group controlId='category'>
                                <FormLabel>Category</FormLabel>
                                <FormControl type='text' placeholder='Enter category name' value={category} onChange={(e) => setCategory(e.target.value)}></FormControl>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <FormLabel>Description</FormLabel>
                                <FormControl as='textarea' placeholder='Enter description name' value={description} onChange={(e) => setDescription(e.target.value)}></FormControl>
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

export default ProductEditScreen
