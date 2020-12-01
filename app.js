const express = require('express');

const app = express();

app.listen(2000, () => {
    console.log(`Server is litening of port: ${2000}`);
    require('./loaders/db');
});
