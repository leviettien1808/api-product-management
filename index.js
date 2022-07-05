const express = require('express');

// Init server
const app = express();

// Conver to JSON
app.use(express.json());

app.listen(4000, () => console.log('server running'));
