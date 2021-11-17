import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Product from '../components/Product'


const HomeScreen = () => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    console.log(products)

    return (
        <div>
            <h1>Latest Products</h1>

            {loading ? <h1>loading</h1> : error ? <h3>{error}</h3> : <Row>
                {products.map((product) => (
                    <Col Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                        <Product product={product} />
                    </Col>
                ))}
            </Row>}

        </div >
    )
}

export default HomeScreen
