const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crudpsql',
  password: '12345megadrive',
  port: 5432,
})


module.exports = {
  query: (text, params) => pool.query(text, params)
}
