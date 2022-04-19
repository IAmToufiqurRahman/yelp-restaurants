import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RestaurantContextProvider } from './context/RestaurantContext'

import Home from './pages/Home'
import RestaurantDetail from './pages/RestaurantDetail'
import UpdateResturant from './pages/UpdateResturant'

function App() {
  return (
    <RestaurantContextProvider>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/restaurants/:id' element={<RestaurantDetail />} />
            <Route path='/restaurants/:id/update' element={<UpdateResturant />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RestaurantContextProvider>
  )
}

export default App
