const express = require('express')

//define model
const controller = require('../module/modules');

//create application/json parser
var jsonParser = express.json();

const router = express.Router();

/**
 * @description Create New Project
 * @method POST /postSavingProject
 */
 router.post('/postSavingProject', jsonParser, controller.createProject);

/**
 * @description 
 * Update Status Project by ID
 * CREATED -> IN PROGRESS -> COMPLETED
 * @method PUT /updateStatus/:id
 */
router.put('/updateStatus/:id', jsonParser, controller.updateStatus);

/**
 * @description Delete Project by ID
 * @method DELETE /deleteProject/:id
 */
 router.delete('/deleteProject/:id', jsonParser, controller.deleteProject);

module.exports = router;