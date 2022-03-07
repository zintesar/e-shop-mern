import React from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {

  const navigate = useNavigate()

  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <Form onSubmit={submitHandler} className='d-flex flex-fill'>
        <Form.Group className='d-flex flex-fill'>
          <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='search product...' className='m-1 p-3 col-10'>
          </Form.Control>
          <Button type='submit' variant='outline-success' className='p-3 m-1' >Search</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default SearchBox