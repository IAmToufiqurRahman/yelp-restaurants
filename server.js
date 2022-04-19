require('dotenv').config()

const { errorHandler } = require('./middleware/errorMiddleware')

const express = require('express')

const app = express()

const port = process.env.PORT || 5000

app.use(express.json())

app.use('/api/restaurants', require('./routes/route'))

app.use(errorHandler)

app.listen(port, () => {
  console.log(`App listening on ${port}`)
})
