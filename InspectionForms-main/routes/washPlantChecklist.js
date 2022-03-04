const express = require('express');
const router = express.Router();

const washPlantChecklist = require('../controllers/washPlantChecklist.js');

router.get('/washPlantChecklist', washPlantChecklist.renderWashPlantChecklist);
// router.get('/', washPlantChecklist.renderWashPlantChecklist);

router.post('/submitDataWP', washPlantChecklist.postWashPlantChecklist);


module.exports = router;