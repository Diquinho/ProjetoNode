const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
console.log('iniciando servidor')

require('./src/index')(app);
app.use(express.static('public'));
app.listen(3333); // Porta