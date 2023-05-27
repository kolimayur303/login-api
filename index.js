const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5100;
const dbConfig = require('./src/config/db.config');

mongoose.Promise = global.Promise;

// connection creation and creation a new db
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () =>{
        console.log('databse connected');
    },
    (error) => {
        console.log('database cant connected:' +error)
    }
);
// Import routes
const userRoutes = require("./src/routes/userRoutes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// route Middlewares
app.use("/api/user", userRoutes);

app.listen(port, () => console.log(`server up and runing on port ${port}`));
