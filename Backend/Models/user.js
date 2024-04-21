// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken")

// const userSchema = new mongoose.Schema({
//     name : {type: String, required: true},
//     username : {type: String, required: true},
//     email : {type: String, required: true},
//     password : {type: String, required: true},
// })

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({_id: this._id}, process.env.jwtprivatekey,{expiresIn:"7d"});
//     return token;
// }

// const user = mongoose.model("users", userSchema);

// module.exports = { user };

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
