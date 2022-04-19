import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = '/api/restaurants/'

const UpdateResturant = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('Price Range')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(API_URL + id)

        setName(response.data.data.restaurant.name)
        setLocation(response.data.data.restaurant.location)
        setPriceRange(response.data.data.restaurant.price_range)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [setName, setLocation, setPriceRange, id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.put(API_URL + id, {
        name,
        location,
        price_range: priceRange
      })

      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='container my-4'>
      <h1 className='text-center mb-3'>Update Restaurant</h1>

      <div className='mb-4 btn btn-light'>
        <Link to='/'>Back to home</Link>
      </div>

      <form>
        <div className='row mb-3'>
          <label htmlFor='name' className='col-sm-2 col-form-label'>
            Name
          </label>
          <div className='col-sm-10'>
            <input value={name} onChange={(e) => setName(e.target.value)} id='name' className='form-control' type='text' />
          </div>
        </div>

        <div className='row mb-3'>
          <label htmlFor='location' className='col-sm-2 col-form-label'>
            Location
          </label>
          <div className='col-sm-10'>
            <input value={location} onChange={(e) => setLocation(e.target.value)} id='location' className='form-control' type='text' />
          </div>
        </div>

        <div className='row mb-3'>
          <label htmlFor='price_range' className='col-sm-2 col-form-label'>
            Price Range
          </label>
          <div className='col-sm-10'>
            <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)} id='price_range' className='form-control' type='number' min='1' max='5' />
          </div>
        </div>

        <button onClick={handleSubmit} type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default UpdateResturant
