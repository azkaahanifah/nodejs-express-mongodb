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
        .then(() => {
            res.status(201).send({ message: 'Success create and store into database' });
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
 * @method DELETE /deleteProject/:id
 */
router.delete('/deleteProject/:id', jsonParser, async (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) { return res.status(404).send({ message: 'ID is Not Found' }) }

    try {
        await Project.findByIdAndRemove(id).then((data) => {
            if(!data) { res.status(404).send({ message: 'Data is Not Found' }) }
            res.send({ message: 'Delete project success' });
        })
    }catch(err) {
        res.status(500).send({ message: err.message || 'Some error occured while delete operation' })
    }
});

/**
 * @description 
 * Update Status Project by ID
 * CREATED -> IN PROGRESS -> COMPLETED
 * @method PUT /updateStatus/:id
 */
router.put('/updateStatus/:id', jsonParser, async (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) { return res.status(404).send({message: 'ID is Not Found'}) }

    try {
        await Project.findByIdAndUpdate(id, req.body, {new: true}).then((data) => {
            if(!data) { res.status(404).send({ message: 'Cannot update project. Maybe user not found!' }) }
            res.send(data);
        })
    }catch(err) {
        res.status(500).send({ message: err.message || 'Error update project status' });
    }
});

module.exports = router;