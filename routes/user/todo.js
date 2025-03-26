const express = require('express');
const { TodoController } = require('../../controller/user');
const router = express.Router();
const validator = require("express-joi-validation").createValidator({ passError: true });
const validationSchema = require('../../controller/user/todo/todo.validations');
const {headerSchema}=require("../../utilities/common")

router.post('/add',validator.headers(headerSchema), validator.body(validationSchema.createTodo),TodoController.add);
router.get('/get',validator.headers(headerSchema),TodoController.get);
router.delete('/delete/:id',validator.headers(headerSchema),validator.params(validationSchema.deleteToDo), TodoController.delete);
router.patch('/patch/:id', validator.headers(headerSchema),validator.body(validationSchema.updateTodo),TodoController.update);
module.exports = router;