const router = require("express").Router();
const Job = require("../Models/jobs");
const User = require("../Models/user");


router.get("/displayJobs", async(req, res) => {
    try {
        const jobs = await Job.find({});
        res.json(jobs);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

router.get("/displayUsers", async(req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;