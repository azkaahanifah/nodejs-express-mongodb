const Project = require('../model/projects');

var modul = {
    createProjects: (param) => {
        var response = {
            status: 0,
            message: ''
        }
        if(param) {
            var project = new Project({
            title: param.body.title,
            description: param.body.description,
            deadline: param.body.deadline,
            budget: param.body.budget,
            status: param.body.status
            })
        
            project.save()
            .then((data) => {
                response = {
                    status: 201,
                    message: 'Success create and store into database'
                }
            })
            .catch(err => {
                response = {
                    status: 400,
                    message: err.message || 'Some error occured while creating a create operation'
                }
            })   
        }
        return response;
    }
}

module.exports = modul;