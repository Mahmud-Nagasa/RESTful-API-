
exports.healthCheck = (request, response) => {
    response.status(200).send({msg: 'server is running'});
}