import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import { listProductDetails } from '../actions/productActions'


import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'

// const ProductScreen = ({ history, match }) => {
const ProductScreen = (props) => {
    let { id } = useParams()
    let navigate = useNavigate()

    const [qty, setQty] = useState(0)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, props.match])

    const addToCartHandler = () => {
        // console.log(`/cart/${id}?qty=${qty}`)

        navigate(`/cart/${id}?qty=${qty}`)


    }

    return (
        <div>



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

                                {product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {[...Array(product.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}> {x + 1}  </option>
                                                    ))
                                                    }
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}

                                <ListGroupItem>
                                    <Button onClick={addToCartHandler} className='btn btn-block' type='button' disabled={product.countInStock === 0}>
                                        Add to Cart
                                    </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>)
            }


        </div >
    )
}

export default ProductScreen
