import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'


import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import InnerImageZoom from 'react-inner-image-zoom';
import { SideBySideMagnifier, } from "@africasokoni/react-image-magnifiers";
import ReactImageMagnify from '@blacklab/react-image-magnify';
import MagnifierContainer from '@africasokoni/react-image-magnifiers/dist/MagnifierContainer'
import MagnifierPreview from '@africasokoni/react-image-magnifiers/dist/MagnifierPreview'
import MagnifierZoom from '@africasokoni/react-image-magnifiers/dist/MagnifierZoom'


// const ProductScreen = ({ history, match }) => {
const ProductScreen = (props) => {
  let params = useParams()
  let navigate = useNavigate()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [mainImage, setMainImage] = useState()

  const dispatch = useDispatch()


  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails


  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin


  const productReview = useSelector(state => state.productReview)
  const { success: successProductReview, error: errorProductReview } = productReview

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(params.id))

  }, [dispatch, props, params, successProductReview])

  const addToCartHandler = () => {

    navigate(`/cart/${params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(params.id, { rating, comment }))
  }



  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant='danger'></Message>
      ) : (
        <>
          {/* {setMainImage(product.image[0])} */}
          <Row>
            <Col md={1}>
              <ListGroup variant='flush'>
                {product.image.map((image) => (
                  <ListGroupItem>
                    {/* <Button > */}
                    <Image src={image} fluid alt={product.name} onClick={() => setMainImage(image)}></Image>
                    {/* </Button> */}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
            <Col md={4} className='py-3'>

              <div
                style={{ height: '', width: '%', objectFit: 'contain', border: '1px solid red' }}
              >

                {/* <MagnifierContainer autoInPlace={true} >
                  <div className="">
                    <MagnifierPreview imageSrc={mainImage ? (mainImage) : (product.image[0])} />
                  </div>
                  <MagnifierZoom style={{ height: "400px" }} imageSrc={mainImage ? (mainImage) : (product.image[0])} />
                </MagnifierContainer> */}

                {/* {(window.innerWidth * 20) / 100} */}
                {/* <InnerImageZoom
                  src={mainImage ? (mainImage) : (product.image[0])}
                  height={(window.innerWidth * 15) / 100}
                // width={}
                /> */}
              </div>


              <SideBySideMagnifier
                imageSrc={mainImage ? (mainImage) : (product.image[0])}
                imageAlt="Example"
                mouseActivation='hover'
                alwaysInPlace={true}
                fillAvailableSpace={true}
              // style={{ height: '20vw', width: '100%', }}
              // style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              />

              {/* <ReactImageMagnify
                imageProps={{
                  alt: 'example small image',
                  src: product.image,
                  height: '10vw',
                  width: '10vh'
                }}
                magnifiedImageProps={{
                  src: product.image,
                  height: '30vw',
                  width: '30vh'
                }}
                magnifyContainerProps={{
                  scale: 2
                }}
                onActivationChanged={function noRefCheck() { }}
                onDetectedEnvironmentChanged={function noRefCheck() { }}
                onPositionChanged={function noRefCheck() { }}
                portalProps={{
                  horizontalOffset: 10,
                  id: 'portal-test-id'
                }}
              /> */}

              {/* <Image src={product.image} fluid alt={product.name} style={{ height: '20vw', width: '100%', objectFit: 'contain' }}></Image> */}
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
                  Description: {product.description}
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
          </Row>
          <Row>
            <Col md={8}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating' className='py-2'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment' className='py-2'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>Submit</Button>
                    </Form>
                  ) : (
                    <Message>Please<Link to='/login'>Sign in</Link> to write a review </Message>
                  )}
                </ListGroupItem>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id} >
                    <strong className='py-2'>{review.name}</strong>
                    <Rating value={review.rating}></Rating>
                    <p className='py-2'>{review.createdAt.substring(0, 10)}</p>
                    <p className='py-1'>{review.comment}</p>
                  </ListGroup.Item>
                ))}



              </ListGroup>
            </Col>
          </Row>
        </>)

      }
    </>
  )
}

export default ProductScreen
