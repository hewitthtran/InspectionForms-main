const express = require('express');
const router = express.Router();

const secondaryChecklist = require('../controllers/secondaryChecklist.js');

router.get('/secondaryChecklist', secondaryChecklist.renderSecondaryChecklist);
// router.get('/', secondaryChecklist.renderSecondaryChecklist);

router.post('/submitDataS', secondaryChecklist.postSecondaryChecklist);


module.exports = router;