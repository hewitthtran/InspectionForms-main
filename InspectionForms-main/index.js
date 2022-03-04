if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
};

const express = require('express')
const app = express();



app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));


//use available routing
const primaryChecklistRoute = require('./routes/primaryChecklist');
const secondaryChecklistRoute = require('./routes/secondaryChecklist');
const washPlantChecklistRoute = require('./routes/washPlantChecklist');
const limeDSPChecklistRoute = require('./routes/limeDSPChecklist');


app.use(primaryChecklistRoute);
app.use(secondaryChecklistRoute);
app.use(washPlantChecklistRoute);
app.use(limeDSPChecklistRoute);



app.listen(process.env.PORT, () => console.log('serving on heroku'));

// app.listen(3000, (req, res) => { console.log('Running on port 3000!') })
