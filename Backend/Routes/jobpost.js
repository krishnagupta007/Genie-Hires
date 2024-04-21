const router = require("express").Router();
const Jobs = require("../Models/jobs");

router.post("/jobs", async(req, res) => {
    try {
        await Jobs.create({
            name: req.body.name,
            email: req.body.email,
            location: req.body.location,
            image: req.body.logoinput,
            industry: req.body.industry,
            companyDescription: req.body.description,
            jobTitle: req.body.title,
            jobType: req.body.jobtype,
            jobLocation: req.body.jobloc,
            compensation: req.body.compensation,
            jobDescription: req.body.jobDescription,
            externalURL: req.body.externalurl
        });

        res.status(200).json({ success: true, message: "Job Posted Successfully" });
    } catch (error) {
        res.status(500).json({ message: error + "Internal Server Error"});
    }
})

module.exports = router ;