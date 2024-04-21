const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Models/user");

router.post("/createuser", async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email Address Already Exists" });
        }

        if(req.body.password.length < 8) {
            res.status(401).json({message: "Password Length should be 8 characters long"})
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            await User.create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: hashPassword
            });

            res.status(201).json({ success: true, message: "User Created Successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;