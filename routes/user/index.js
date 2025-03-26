const express = require('express');
const router = express.Router();
const {Auth}=require('../../middlewares')
router.use('/auth', require('./auth'))
router.use('/todo', Auth(),require('./todo'))
module.exports=router;
