require('dotenv').config();
const { client } = require('./db');
const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

const init = async () => {
    await client.connect();
    console.log('connected to databse');
};


init();


