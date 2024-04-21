const router = require("express").Router();
const User = require("../Models/user");
const Jobs = require("../Models/jobs");


router.post("/deleteUser", async(req, res) => {
    try {
        await User.deleteOne({ _id: req.body.userid });
        res.status(200).json({status: "ok", message: "User Deleted Successfully" + req.body.userid})
    } catch (error) {
        res.status(501).json({message: "Internal Server Error."});
    }
})


router.post("/deleteJob", async(req, res) => {
    try {
        await Jobs.deleteOne({_id: req.body.jobid });
        res.status(200).json({status: "ok", message: "Job Deleted Successfully"})
    } catch (error) {
        res.status(501).json({message: "Internal Server Error."});
    }
})

module.exports = router;