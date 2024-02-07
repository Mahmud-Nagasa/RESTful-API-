const db = require('../db/connection.js')

exports.selectParks = () => {
    return db.query(`SELECT * FROM parks`)
};

exports.updateParkById = () => {};

exports.removeParkById = () => {};
