const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  first_name:{
    type : String
  },
  last_name:{
    type : String
  },
  email:{
      type : String,
      required: true,
      unique: true
  },
  password:{
    type : String,
    required: true,
    unique: true
  }
  
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject.id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("User", userSchema);
