const User = require("../model/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// Register user
const register = async (req, res) => {

    const {first_name,last_name,email,password} = req.body
    try{
        const exitstingUser = await User.findOne({email:email});
        if(exitstingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashPassword = await bcrypt.hash(password, 10);
       
        const result = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashPassword
        });

        const token = jwt.sign({email: result.email,id : result._id}, process.env.SECRET_KEY);
        res.status(201).json({user: result, token});
       
        }catch(error){
            console.log(error);
            res.status(500).json({message: "Something went to wrong"});
    }
};

// Login User
const login = async (req, res) => {

    const {email, password} = req.body;
    try {

        const exitstingUser = await User.findOne({email:email});
        if(!exitstingUser){
            return res.status(404).json({message: "User not found"});
        }

        const matchPassword = await bcrypt.compare(password, exitstingUser.password);

        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign({email: exitstingUser.email,id : exitstingUser._id}, process.env.SECRET_KEY);
        res.status(201).json({user: exitstingUser, token});

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something went to wrong"});
    }
};


// Get All users
const allUsers = async (req, res) => {
    try {
        const Users = await User.find();
        res.json(Users);
      } catch (error) {
        res.json({ message: error });
      } 
};


module.exports = {
    register,
    login,
    allUsers
  }