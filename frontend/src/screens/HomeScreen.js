import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'


const HomeScreen = () => {

    const params = useParams()
    const dispatch = useDispatch()

    const keyword = params.keyword

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            <h1>Latest Products</h1>

            {loading ? (
                <Loader></Loader>
            ) : error ? (
                <Message variant='danger'></Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>)}

        </div >
    )
}

export default HomeScreen
