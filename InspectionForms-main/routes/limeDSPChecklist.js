const express = require('express');
const router = express.Router();

const limeDSPChecklist = require('../controllers/limeDSPChecklist.js');

router.get('/limeDSPChecklist', limeDSPChecklist.renderLimeDSPChecklist);
// router.get('/', limeDSPChecklist.renderlimeDSPChecklist);

router.post('/submitDataLD', limeDSPChecklist.postLimeDSPChecklist);


module.exports = router;