import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

// import products from '../products'

import axios from 'axios'

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {

        // console.log(products)

        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products')

            console.log(data)

            if (data === null) {
                console.log('no data')
            }

            setProducts(data)
        }

        fetchProducts()
    }, [])

    console.log(products)

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    <Col Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div >
    )
}

export default HomeScreen
