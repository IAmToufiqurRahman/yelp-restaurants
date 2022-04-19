import axios from 'axios'
import { useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

const API_URL = '/api/restaurants/'

const AddReview = () => {
  const { id } = useParams()

  //useLocation: This hook returns the location object used by the react-router. This object represents the current URL and is immutable. Whenever the URL changes, the useLocation() hook returns a newly updated location object.
  const location = useLocation()
  console.log(location)

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState('Rating')

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    try {
      await axios.post(API_URL + id + '/addReview', {
        name,
        review: reviewText,
        rating
      })

      // navigate('/')
      // navigate(location.pathname)

      const refreshPage = () => {
        navigate(0)
      }

      refreshPage()
    } catch (err) {}
  }
  return (
    <div className='container my-4'>
      <form>
        <div className='row mb-3'>
          <label className='col-sm-2 col-form-label' htmlFor='name'>
            Name
          </label>
          <div className='col-sm-10'>
            <input value={name} onChange={(e) => setName(e.target.value)} id='name' placeholder='name' type='text' className='form-control' />
          </div>
        </div>

        <div className='row mb-3'>
          <label className='col-sm-2 col-form-label' htmlFor='rating'>
            Rating
          </label>
          <div className='col-sm-10'>
            <select value={rating} onChange={(e) => setRating(e.target.value)} id='rating' className='form-select'>
              <option disabled>Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
          </div>
        </div>

        <div className='row mb-3'>
          <label className='col-sm-2 col-form-label' htmlFor='Review'>
            Review
          </label>
          <div className='col-sm-10'>
            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} id='Review' className='form-control'></textarea>
          </div>
        </div>

        <button type='submit' onClick={handleSubmitReview} className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddReview
