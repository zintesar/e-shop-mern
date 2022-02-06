import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card, ListGroupItem, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const [sdkReady, setSdkReady] = useState(false)


    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { success: successPay, loading: loadingPay, } = orderPay

    if (!loading) {

        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        // calculate prices
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }


    useEffect(() => {

        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }

            document.body.appendChild(script)
        }

        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(params.id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [navigate, dispatch, params, order])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(params.id, paymentResult))
    }



    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
            <h1> Order {order.id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>
                                <a href={`maileto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (

                                <Message variant='danger'>Not Delivered</Message>
                            )}
                        </ListGroupItem>


                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (

                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroupItem>


                        <ListGroupItem>
                            <Row>
                                <Col md={8}>
                                    <h2>Order Items</h2>
                                </Col>
                                <Col md={4}>
                                    qty x price
                                </Col>
                            </Row>
                            {order.orderItems.length === 0 ? <Message> Your Order is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroupItem key={index} className='pb-3'>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price} = {item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>


                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            {!order.isPaid && (
                                <ListGroupItem>
                                    {loadingPay && <Loader></Loader>}
                                    {!sdkReady ? <Loader></Loader> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} ></PayPalButton>
                                    )}
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>

}

export default OrderScreen
