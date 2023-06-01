const personsRouter = require('express').Router();
const Person = require('../models/person');

personsRouter.get('/', (req, res) => {
    Person.find({})
    .then(result => res.json(result))
});

module.exports = personsRouter;
