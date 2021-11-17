import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'


import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = ({ match }) => {
    let { id } = useParams()
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch])


    return (
        <div>

            {/* <h1>asd</h1> */}


            <Link className='btn btn-dark my-3' to='/'>
                Go Back
            </Link>
            {loading ? (
                <Loader></Loader>
            ) : error ? (
                <Message variant='danger'></Message>
            ) : (
                <Row>
                    <Col md={6}>
                        <image src={product.Image} fluid ></image>
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                            </ListGroupItem>
                            <ListGroupItem>
                                Price: ${product.price}
                            </ListGroupItem>
                            <ListGroupItem>
                                Description: ${product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Price:
                                        </Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Button className='btn btn-block' type='button' disabled={product.countInStock === 0}>
                                        Add to Cart
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>)}


        </div>
    )
}

export default ProductScreen
