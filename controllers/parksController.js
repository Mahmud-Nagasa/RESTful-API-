const {selectParks} = require('../models/parks.js')

exports.getParks = (request, response) => {
    selectParks().then(({rows}) => {
        response.status(200).send(rows)
    })
}