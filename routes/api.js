const { ObjectID } = require('bson');
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

/**
 * @description Delete Project by ID
 * @method GET /deleteProject/:id
 */
router.get('/deleteProject/:id', jsonParser, (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) { return res.status(404).send({message: 'ID is Not Found'}) }

    try {
        Project.findByIdAndRemove(id).then((data) => {
            if(!data) { res.status(404).send({message: 'Data is Not Found'}) }
            res.send({message: 'Delete success'});
        })
    }catch(err) {
        res.status(500).send({
            message: err.message || 'Some error occured while creating a create operation'
        })
    }
});

module.exports = router;