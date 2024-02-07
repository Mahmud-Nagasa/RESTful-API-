const { parks, rides, stalls, foods } = require("./data/index.js");
const format = require('pg-format')
const db = require("./connection");

function seed() {
  return db
    .query("DROP TABLE IF EXISTS rides;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls_foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS parks;");
    })
    .then(() => {
      return createParks();
    }).then(() => {
      return createRides();
    }).then(() => {
      return insertParks()
    }).then(({ rows }) => {
      return insertRides(rows)
    }).then(() => {
      return createStalls()
    }).then(() => {
      return createFoods()
    }).then(() => {
      return createStallsAndFoods()
    }).then(() => {
      return getParkColumns()
    }).then(({rows}) => {
      return insertStalls(rows)
    }).then(() => {
      return insertFood()
    })
}

function createParks() {
  /* Create your parks table in the query below */
  return db.query(`CREATE TABLE parks(
    park_id SERIAL PRIMARY KEY,
    park_name VARCHAR,
    year_opened INT,
    annual_attendance INT 
  )`);
}

function createRides() {
  return db.query(`CREATE TABLE rides(
    ride_id SERIAL PRIMARY KEY,
    park_id INT REFERENCES parks(park_id),
    ride_name VARCHAR,
    year_opened INT,
    votes INT
  )`)
}

function insertParks() {
  const string = format(`INSERT INTO parks 
      (park_name, year_opened, annual_attendance)
      VALUES
      %L RETURNING *`, parks.map(element => {
        return [element.park_name, element.year_opened, element.annual_attendance]
      }))
      return db.query(string)
}

function parkNameAndId(rows) {
  const result = {}
   rows.forEach(element => {
    return result[element.park_name] = element.park_id
   })
  return result
}

function insertRides(rows) {
  const parksObj = parkNameAndId(rows)
 const string = format(
   `INSERT INTO rides 
  (park_id,ride_name,year_opened,votes)
  VALUES %L RETURNING *`,
   rides.map((element) => {
     return [
       parksObj[element.park_name],
       element.ride_name,
       element.year_opened,
       element.votes,
     ];
   })
 );
 return db.query(string); 
}

function createStalls() {
  return db.query(`CREATE TABLE stalls(
    stall_id SERIAL PRIMARY KEY,
    stall_name VARCHAR,
    park_id INT REFERENCES parks(park_id) ON DELETE CASCADE
  )`)
}

function createFoods() {
  return db.query(`CREATE TABLE foods (
    food_id SERIAL PRIMARY KEY,
    food_name VARCHAR,
    vegan_option BOOLEAN
  )`)
}

function createStallsAndFoods() {
  return db.query(`CREATE TABLE stalls_foods(
    stall_id INT REFERENCES stalls(stall_id) ON DELETE CASCADE,
    food_id INT REFERENCES foods(food_id) ON DELETE CASCADE
  )`)
}

function getParkColumns() {
  return db.query(`SELECT *
  FROM parks`)
}

function insertStalls(rows) {
  const parksObj = parkNameAndId(rows);
  const string = format(`INSERT INTO stalls
  (stall_name, park_id)
  VALUES %L`, stalls.map(element => {
    return [element.stall_name, parksObj[element.park_name]]
  }))
  return db.query(string);
}

function insertFood() {
  const string = format(`INSERT INTO foods
  (food_name, vegan_option)
  VALUES %L`, foods.map(element => {
    return [element.food_name, element.vegan_option]
  }))
  return db.query(string);
}

function foodNameAndId(rows) {
  const result = {}
   rows.forEach(element => {
    return result[element.food_name] = element.food_id
   })
  return result
}

function servedFood() {
  return stalls.map(element => {
    return element.foods_served
  })
}

function insertStallsAndFoods() {
  
}

module.exports = { seed, parkNameAndId }
