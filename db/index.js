const { Pool } = require('pg')

const proConfig = process.env.DATABASE_URL

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'production' ? proConfig : null
})

module.exports = {
  query: (text, params) => pool.query(text, params)
}
