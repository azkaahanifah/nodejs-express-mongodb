const express = require('express');

//define model
const Project = require('../model/projects');

//create application/json parser
var jsonParser = express.json();

const router = express.Router();

/**
 * @description Create New Project
 * @method POST /postSavingProject
 */
 router.post('/postSavingProject', jsonParser, (req, res) => {
    if (!(req && req.body)) {
        res.status(400).send({message: 'Cannot be Empty Parameter'});
    } else {
        var project = new Project({
            title: req.body.title,
            description: req.body.description,
            deadline: req.body.deadline,
            budget: req.body.budget,
            status: req.body.status
        })

        project
        .save()
        .then((data) => {
            res.status(201).send({message: 'Success create and store into database'});
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occured while creating a create operation'
            });
        })
    }
});

module.exports = router;