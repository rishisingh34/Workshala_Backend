require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT; 
const dburl = process.env.dburl; 

mongoose.connect(dburl);
const db = mongoose.connection;
db.on( "error", (error) => console.log(error));
db.once( "open" , () => console.log("Database Connected")); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use(require("./routes/register.route"));

app.get('/', (req, res) => {
    res.send('Nothing');
})

app.listen( port , () => {
    console.log(`Listening on Port ${port}`);
})
