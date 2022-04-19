const asyncHandler = require('express-async-handler')

const db = require('../db/index')

// get all restaurants
const getRestaurants = asyncHandler(async (req, res) => {
  const results = await db.query('select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;')

  res.status(200).json({
    status: 'success',
    results: results.rows.length,
    data: {
      restaurants: results.rows
    }
  })
})

// get a single restaurants
const getRestaurant = asyncHandler(async (req, res) => {
  const results = await db.query('select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1', [req.params.id])

  const reviews = await db.query('SELECT * FROM reviews WHERE restaurant_id = $1', [req.params.id])

  res.status(200).json({
    status: 'success',
    data: {
      restaurant: results.rows[0],
      reviews: reviews.rows
    }
  })
})

// create a restaurants
const createRestaurant = asyncHandler(async (req, res) => {
  const { name, location, price_range } = req.body

  // postgres by default doesn't return any data after insering data only returns this: INSERT 0 3
  // to get the results we have to add 'returning *' in the query
  const results = await db.query('INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *', [name, location, price_range])

  res.status(201).json({
    status: 'success',
    data: {
      restaurant: results.rows[0]
    }
  })
})

// update a restaurants
const updateRestaurant = asyncHandler(async (req, res) => {
  const { name, location, price_range } = req.body

  const results = await db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *', [name, location, price_range, req.params.id])

  res.status(200).json({
    status: 'success',
    data: {
      restaurant: results.rows[0]
    }
  })
})

// delete a restaurants
const deleteRestaurant = asyncHandler(async (req, res) => {
  const results = await db.query('DELETE FROM restaurants WHERE id = $1', [req.params.id])

  res.status(204).json({
    status: 'success',
    data: results
  })
})

// add review to a restaurant
const addReview = asyncHandler(async (req, res) => {
  const results = await db.query('INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *', [req.params.id, req.body.name, req.body.review, req.body.rating])

  res.status(201).json({
    status: 'success',
    data: {
      review: results.rows[0]
    }
  })
})

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addReview
}
