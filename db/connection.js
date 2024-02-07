/**
 * Create your connection to the DB in this file
 * and remember to export it
 */
const { Pool } = require('pg')
const { PGDATABASE } = process.env

if (!PGDATABASE) {
  throw new Error('there is no PGDATABASE')
}

const connection = new Pool()

module.exports= connection