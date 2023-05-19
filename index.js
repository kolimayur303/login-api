const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5100;

mongoose.Promise = global.Promise;

// connection creation and creation a new db
mongoose.connect('mongodb://127.0.0.1:27017/user').then(db =>{
    
    console.log('MONGO connected');

}).catch(error => console.log(error));

// Import routes
const userRoutes = require("./src/routes/userRoutes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use(cors());

// route Middlewares
app.use("/api/user", userRoutes);

app.listen(port, () => console.log(`server up and runing on port ${port}`));
