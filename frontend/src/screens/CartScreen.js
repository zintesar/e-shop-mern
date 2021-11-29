import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'

import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'
import { useDispatch } from 'react-redux'

const CartScreen = () => {

    const params = useParams()
    const location = useLocation()
    const history = useNavigate()

    const productId = params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])
    // console.log(location.search)



    return (
        <div>

        </div>
    )
}

export default CartScreen
