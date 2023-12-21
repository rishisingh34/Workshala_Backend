require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const port = process.env.PORT; 
const dburl = process.env.dburl; 

// Connecting to database ( mongodb Atlas )
mongoose.connect(dburl);
const db = mongoose.connection;
db.on( "error", (error) => console.log(error));
db.once( "open" , () => console.log("Database Connected")); 

// resolving cors errors 
app.use(
  cors({
    origin: "*", // allow all requests
    credentials: true,  
    optionsSuccessStatus: 200, // send status code 200 upon success 
  })
);

app.use(cookieParser());

// Using bodyParser to handle request and responses from client-server 
app.use(bodyParser.json());
// to handle data in url generally in query parameters ( ?Key=value pairs )
app.use(bodyParser.urlencoded({ extended : true }));   // extended : true for handling complex parameters

// for using static assets from public folder 
app.use(express.static('public'));

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
