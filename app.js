require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT; 
const dburl = process.env.dburl; 

// Connecting to database ( mongodb Atlas )
mongoose.connect(dburl);
const db = mongoose.connection;
db.on( "error", (error) => console.log(error));
db.once( "open" , () => console.log("Database Connected")); 

// Using bodyParser to handle request and responses from client-server 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// route user sign Up 
app.use(require("./routes/user.signUp.route"));
// route for user login 
app.use(require("./routes/user.login.route"));
// routes for workshala features
app.use(require("./routes/workshala.route"));

app.get('/', (req, res) => {
    res.send('Nothing');
})

app.listen( port , () => {
    console.log(`Listening on Port ${port}`);
})
