require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT; 
const dburl = process.env.dburl; 

// Connecting to database ( mongodb Atlas )
mongoose.connect(dburl);
const db = mongoose.connection;
db.on( "error", (error) => console.log(error));
db.once( "open" , () => console.log("Database Connected")); 


app.use(cors({
  origin : "https://localhost:5173",
  methods : ["GET", "POST", "PUT", "DELETE"],
  credentials : true 
}))

// Using bodyParser to handle request and responses from client-server 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// using ejs for server-side rendering 
app.set("view engine", "ejs");

// route for authentication 
app.use(require("./routes/auth.route"));

// routes for workshala features
app.use(require("./routes/workshala.route"));

app.get('/', (req, res) => {
    res.send('<center><h1 style="color : green; font-family : lucida sans ">Server Entry Point</h1></center>');
})

app.listen( port , () => {
    console.log(`Listening on Port ${port}`);
})
