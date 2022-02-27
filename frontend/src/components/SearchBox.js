import React from 'react'
import { useState } from 'react'
import { Button, Form, Placeholder } from 'react-bootstrap'
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
    <div>
      <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='search product...' className='m-1 p-3'>
        </Form.Control>
        <Button type='submit' variant='outline-success' className='p-3 m-1' >Search</Button>
      </Form>
    </div>
  )
}

export default SearchBox