// const http = require("http");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../Models/user");
const { REACT_APP_EMAIL_USER, REACT_APP_EMAIL_PASSWORD } = require("../EnvironmentVariables");
const OTP = `${Math.floor(100000 + Math.random() * 900000)}`;

router.post("/otpRequest", async (req, response) => {
    try {
    if(await User.findOne({ email: req.body.email })){

        const auth = nodemailer.createTransport({
            service: "gmail",
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth: {
                user: REACT_APP_EMAIL_USER,
                pass: REACT_APP_EMAIL_PASSWORD
            }
        });
    
        const message = {
            from: `Genie Hires geniehiresinc@gmail.com`,
            to: req.body.email,
            subject: "Password Recovery",
            html: `
            <h4>Aabra Kadaabara ${req.body.email} <br/><br/>A request has been made from your account to reset your password at Genie Hire's. A unique 6 digit OTP is attached below to continue with your password reset at Genie Hire's. It is recommended to not share this 6 digit OTP with others to maintain the security of your account and prevent any future circumstances</h4>
            <h3>6 digit OTP: <u> ${OTP} </u> </h3>
            <h4>Please ignore the email if the request is not made by you. Someone else might have mistakenly typed your email-address</h4>
            <h3>Best Regards <br/> Genie Hire's Inc.</h3>
            </div>
            `
        };
        auth.sendMail(message, (err, res) => {
            if(err) throw err
            console.log("Mail Sent Successfully!");
            response.status(200).json({message: "Mail Sent Successfully !!!"})
            res.end();
        });
    } else {
        return response.status(400).json({message: "Noo Such User Found !!"})
    }
    } catch (error) {
        response.status(501).json({message: `Internal Server Error`})
    }
});

router.post("/passwordReset", async (req, response) => {
    try {
        if(OTP === req.body.otp){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    
            await User.updateOne({email: req.body.email}, {$set:{password: hashedPassword}})
            response.status(200).json({message: `Password Updated Successfully`})
        } else {
            response.status(403).json({message: "Wrong OTP Entered"})
        }
    } catch (error) {
        response.status(500).json({message: "Internal Server Error"})
    }
});

module.exports = router;