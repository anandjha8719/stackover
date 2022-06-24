const express = require('express');

const router = express.Router();
const votesController = require('../controllers/votes_controller');


router.get('/toggle', votesController.toggleVote);


module.exports = router;