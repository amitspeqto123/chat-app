const {signupControlle} = require('../controllers/user.controller');
const {loginController} = require('../controllers/user.controller');

const express = require('express');
const router = express.Router();

router.post("/register", signupControlle);
router.post("/login", loginController);


module.exports = router;