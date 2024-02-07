const  db  = require('../db/connection') 

exports.selectRidesByParkId = (ride_id) => {
  return db.query(`SELECT ride_id, ride_name, rides.year_opened, park_name, votes FROM rides
   JOIN parks ON rides.park_id = parks.park_id
  WHERE ride_id = $1`, [ride_id])
};

exports.updateRidesByParkId = (ride_name, year_opened, park_id) => {
  return db.query(`INSERT INTO rides 
(ride_name, year_opened, park_id, votes)
VALUES
($1,$2,$3,0) RETURNING *`, [ride_name, year_opened, park_id]).then(({rows}) => {
  const newRide = rows[0]
  return newRide
})
}

exports.updateRideName = (ride_name, ride_id) => {
  return db.query(`UPDATE rides 
  SET
  ride_name = ($1)
  WHERE ride_id = ($2)
  RETURNING *`, [ride_name, ride_id]).then(({rows}) => {
    const updatedRide = rows[0]
    return updatedRide
  })
}

exports.deleteRideById = (ride_id) => {
  return db.query(`DELETE FROM rides
  WHERE ride_id = $1 RETURNING *`, [ride_id]).then(() => {
    return db.query(`SELECT * FROM rides`)
  }).then(({ rows }) => {
    const rides = rows
    return rides
  })
}


