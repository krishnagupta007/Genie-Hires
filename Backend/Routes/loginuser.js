const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Models/user");
const { REACT_APP_JWTPRIVATEKEY } = require("../EnvironmentVariables");
const jwt = require("jsonwebtoken");
const jwtprivatekey = REACT_APP_JWTPRIVATEKEY;

router.post("/loginuser", async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if(!existingUser) {
            return res.status(400).json({errros: "No Such User Found!!!"});
        }

        const passwordMatch = await bcrypt.compare(req.body.password, existingUser.password);
        if (!passwordMatch) {
            return res.status(405).json({ errors: "Password is Incorrect!!!" });
        }

        // On Successful Login - Sending JWT Auth Token
        const data = {
            user:{
                id: existingUser._id
            }
        }

        const authToken = jwt.sign(data, jwtprivatekey)

        return res.status(201).json({ success: true, authToken: authToken, message: "Login Successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;