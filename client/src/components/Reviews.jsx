import StarRating from './StarRating'

const Reviews = ({ reviews }) => {
  return (
    <div className='container row mb-2'>
      {reviews.map((review) => {
        return (
          <div key={review.id} className='col-sm-3 card text-white bg-primary mb-3 me-2' style={{ maxWidthe: '30%' }}>
            <div className='card-header d-flex justify-content-between'>
              <span>{review.name}</span>
              <span>
                <StarRating rating={review.rating} />
              </span>
            </div>

            <div className='card-body'>
              <p className='card-text'>{review.review}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Reviews
