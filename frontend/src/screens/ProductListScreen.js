import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom';
import { deleteProduct, listProducts, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';


const ProductListScreen = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const pageNumber = params.pageNumber || 1

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        dispatch({ type: PRODUCT_CREATE_RESET })


        if (!userInfo.isAdmin) {
            navigate('/login')

        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))

        }



        // if (userInfo && userInfo.isAdmin) {


        //     dispatch(listProducts())

        // } else {

        //     navigate('/login')

        // }

    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ')) {

            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }

    return (
        <>
            <Row>
                <Col className=''>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>


                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>

                </Col>
            </Row>
            {loadingDelete && <Loader></Loader>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader></Loader>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>$ {product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => { deleteHandler(product._id) }}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true}></Paginate>
                </>
            )}
        </>
    )


};

export default ProductListScreen;
