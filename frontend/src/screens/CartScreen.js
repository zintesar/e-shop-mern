import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'

const CartScreen = () => {

    const params = useParams()
    const location = useLocation()
    const history = useNavigate()

    const productId = params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    console.log(cartItems)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    // console.log(location.search)V



    return (
        <div>

        </div>
    )
}

export default CartScreen
