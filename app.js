const express = require('express');
const {healthCheck} = require('./controllers/healthCheckController.js')
const { getParks } = require('./controllers/parksController.js')
const {getRide, insertRide, patchRide, deleteRide} = require('./controllers/rideController.js')
const app = express();

app.use(express.json())

app.get('/api/healthCheck', healthCheck)

app.get('/api/parks', getParks)

app.get('/api/ride/:ride_id', getRide)

app.post('/api/parks/:park_id/rides', insertRide)

app.patch('/api/rides/:ride_id', patchRide)

app.delete('/api/rides/:ride_id', deleteRide)

module.exports = app;