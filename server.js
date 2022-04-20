require('dotenv').config()

const path = require('path')

const { errorHandler } = require('./middleware/errorMiddleware')

const express = require('express')

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

app.use('/api/restaurants', require('./routes/route'))

app.use(errorHandler)

if (process.env.NODE_ENV === 'production') {
  // serve static content
  app.use(express.static(path.join(__dirname, 'client/build')))
}

app.listen(port, () => {
  console.log(`App listening on ${port}`)
})
