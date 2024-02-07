const { selectRidesByParkId, updateRidesByParkId, updateRideName, deleteRideById} = require("../models/rides.js");
exports.getRide = (request, response) => {
  const { ride_id } = request.params
  selectRidesByParkId(ride_id).then(({rows}) => {
    const rides = rows[0]
    response.status(200).send({rides: rides});
  });
}

exports.insertRide = (request, response) => {
  
  const { ride_name, year_opened } = request.body
  const { park_id } = request.params
  updateRidesByParkId(ride_name, year_opened, park_id).then((ride) => {
    response.status(201).send({ride: ride})
    
  })
}

exports.patchRide = (request, response) => {
  const { ride_name } = request.body 
  const { ride_id } = request.params
  updateRideName(ride_name, ride_id).then((ride) => {
    response.status(200).send({ride: ride})
    
  })
}

exports.deleteRide = (request, response) => {
  const { ride_id } = request.params
  deleteRideById(ride_id).then((rides) => {
    console.log(rides)
    const search = rides.find(element => {
      return element.ride_id === 1
    })
    if (!search) {
      response.status(204).send()
    }
    
  })
}