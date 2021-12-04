import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'
import Button from '@restart/ui/esm/Button'


const CartScreen = () => {

    const params = useParams()
    const location = useLocation()
    const history = useNavigate()

    const productId = params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1


    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart


    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        console.log('removed')
    }

    return (

        <div> cart</div>
    )
}

export default CartScreen
