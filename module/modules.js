const { ObjectID } = require('bson');
const dotenv = require('dotenv');
const Project = require('../model/projects');

dotenv.config({path : 'log.message.env'});

class projectModule {
    static createProject (req, res) {
        if (!(req && req.body)) {
            return res.status(400).send({message: process.env.ERROR_EMPTY_PARAM});
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
            .then(()=> {
                return res.status(201).send({ message: process.env.SUCCESS_CREATE_PROJECT });
            })
            .catch(e => {
                return res.status(500).send({
                    message: e.message || process.env.ERROR_CREATE_PROJECT
                });
            })
        }
    };

    static async updateStatus (req, res) {
        var id = req.params.id;

        if(!ObjectID.isValid(id)) { return res.status(404).send({message: process.env.ID_IS_NOT_FOUND}) }

        try {
            await Project.findByIdAndUpdate(id, req.body, {new: true}).then((data) => {
                if(!data) { res.status(404).send({ message: process.env.DATA_IS_NOT_FOUND }) }
                res.send(data);
            })
        }catch(err) {
            res.status(500).send({ message: err.message || process.env.ERROR_UPDATE_STATUS });
        }
    };

    static async deleteProject (req, res) {
        var id = req.params.id;

        if(!ObjectID.isValid(id)) { return res.status(404).send({ message: process.env.ID_IS_NOT_FOUND }) }

        try {
            await Project.findByIdAndRemove(id).then((data) => {
                if(!data) { res.status(404).send({ message: process.env.DATA_IS_NOT_FOUND }) }
                res.send({ message: process.env.SUCCESS_DELETE_PROJECT });
            })
        }catch(err) {
            res.status(500).send({ message: err.message || process.env.ERROR_DELETE_PROJECT })
        }
    };
}

module.exports = projectModule;