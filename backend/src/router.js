const express = require('express');
const router = express.Router();

const tasksController = require('./controllers/tasksController')
const tasksMiddleware = require('./middlewares/taskMiddlewares')


router.get('/tasks', tasksController.getAll);
router.post('/tasks',tasksMiddleware.validateTitle, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id',tasksMiddleware.validateFieldStatus ,tasksController.updateTask);

module.exports = router;