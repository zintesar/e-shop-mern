import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, ListGroup } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'


const CartScreen = () => {

    const params = useParams()
    const location = useLocation()
    const history = useNavigate()

    const productId = params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    // console.log(cartItems)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])



    return (

        <div>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty
                        <Link to='/'>
                            Go Back
                        </Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>

                    </ListGroup>
                )}
            </Col>
            <Col md={2}

            ></Col>
            <Col md={2}

            ></Col>
        </div>
    )
}

export default CartScreen
