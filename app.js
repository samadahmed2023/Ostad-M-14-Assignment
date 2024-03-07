// Basic Library import.
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");


// security middleware library import.
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");


// Database library import.
const mongoose = require("mongoose");

// Security middleware implement.
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());


// Body parser implement.
app.use(bodyParser.json());

// Request rate limit.
const limiter = rateLimit({windowMs: 15*60*1000, max:3000});
app.use(limiter);


// Mongodb database connection.
let URI = "mongodb://localhost:27017/TestProject";
let OPTION = {user:"",pass:"", autoIndex:true};

mongoose.connect(URI,OPTION).then(()=>{
    console.log("Database Connect")
}).catch(()=>{
    console.log("Database Connection fail")
})


// Routing implement.
app.use("/api/v1" ,router);


// Undefined route implement.
app.use("*", (req,res)=>{
    res.status(404).json({status:"fail", data:"Not Found"})
})


module.exports = app;

