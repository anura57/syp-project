const path = require('path');
const User = require('../models/authModel');
const bcrypt = require('bcryptjs')


async function Signup(req, res){
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        console.log(user);
        res.redirect('/login');
    } catch (error) {
        console.error("Error occurred during signup:", error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            res.status(400).json({ error: "Email already exists" });
        } else {
            res.status(500).send("Internal server error");
        }
    }
}

async function Login(req, res){
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ error: "Invalid Credentials or Empty fields" });
        } else {
            res.status(200).json({ message: "Login successful", user });
        }
    } catch (error) {
        console.error("Error occurred during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports = {
    Signup, Login
}