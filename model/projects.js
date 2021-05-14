const mongoose = require('mongoose');

//schema for Project Model
const schema = mongoose.Schema({
    title: String,
    description: String,
    deadline: Date,
    budget: Number,
    status: String
})

//creating the collection address
const Project = mongoose.model('projects', schema);

module.exports = Project;