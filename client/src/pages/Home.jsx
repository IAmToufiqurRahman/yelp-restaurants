import React from 'react'
import AddRestaurants from '../components/AddRestaurants'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'

const Home = () => {
  return (
    <>
      <Header />
      <AddRestaurants />
      <RestaurantList />
    </>
  )
}

export default Home
