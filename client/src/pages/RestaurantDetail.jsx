import axios from 'axios'
import { useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import AddReview from '../components/AddReview'
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews'

import { RestaurantContext } from '../context/RestaurantContext'

const API_URL = '/api/restaurants/'

const RestaurantDetail = () => {
  const { id } = useParams()

  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + id)

        console.log(response.data.data)

        setSelectedRestaurant(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id, setSelectedRestaurant])

  return (
    <div className='container'>
      <h1 className='text-center my-3'>{selectedRestaurant && selectedRestaurant.restaurant.name}</h1>

      <div className='my-1 btn btn-light'>
        <Link to='/'>Back to home</Link>
      </div>

      <div className='text-center'>
        <StarRating rating={selectedRestaurant && selectedRestaurant.restaurant.average_rating} />
        <span className='text-warning ml-1'>{selectedRestaurant && selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : '(0)'}</span>
      </div>

      {selectedRestaurant && (
        <>
          <div className='mt-3'>
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>

          <AddReview />
        </>
      )}
    </div>
  )
}

export default RestaurantDetail
