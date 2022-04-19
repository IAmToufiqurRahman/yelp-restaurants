import { useContext, useState } from 'react'
import axios from 'axios'

import { RestaurantContext } from '../context/RestaurantContext'

const API_URL = '/api/restaurants'

const AddRestaurants = () => {
  const { addRestaurant } = useContext(RestaurantContext)

  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState('Price Range')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(API_URL, {
        name,
        location,
        price_range: priceRange
      })

      addRestaurant(response.data.data.restaurant)
    } catch (error) {
      console.log(error)
    }

    setName('')
    setLocation('')
    setPriceRange('Price Range')
  }

  return (
    <form className='my-4 row gx-3 gy-2 align-items-center'>
      <div className='col'>
        <input value={name} onChange={(e) => setName(e.target.value)} type='text' className='form-control' placeholder='Name' />
      </div>

      <div className='col'>
        <input value={location} onChange={(e) => setLocation(e.target.value)} className='form-control' type='text' placeholder='Location' />
      </div>

      <div className='col'>
        <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className='form-select '>
          <option disabled>Price Range</option>
          <option value='1'>$</option>
          <option value='2'>$$</option>
          <option value='3'>$$$</option>
          <option value='4'>$$$$</option>
          <option value='5'>$$$$$</option>
        </select>
      </div>

      <div className='col-auto'>
        <button onClick={handleSubmit} type='submit' className='btn btn-primary'>
          Add Restaurant
        </button>
      </div>
    </form>
  )
}

export default AddRestaurants
