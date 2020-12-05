const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({origin: 'http://localhost:3000'}));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 


app.listen(2000, () => {
    console.log(`Server is litening of port: ${2000}`);
    require('./loaders/db');
    require('./api/user')(app);
});
