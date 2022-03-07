import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'


const Product = ({ product }) => {
    return (

        <Card className='my-3 p-3 rounded d-flex align-self-stretch'>

            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' style={{ height: '20vw', width: '100%', objectFit: 'scale-down' }}></Card.Img>
            </Link>

            <Card.Body>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>


                <Card.Text as='div' className='mt-auto'>
                    <Rating value={product.rating} text={`${product.numReviews}`}></Rating>
                </Card.Text>

                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>

        </Card>
    )
}

export default Product
