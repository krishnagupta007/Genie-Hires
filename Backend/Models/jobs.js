const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    industry: { type: String, required: true },
    companyDescription: { type: String, required: true},
    jobTitle: { type: String},
    jobType: { type: String},
    jobLocation: { type: String},
    compensation: { type: String, required: true },
    jobDescription: { type: String, required: true },
    externalURL: { type: String},
    postedAt: { type: Date, default: Date.now }
});

const Jobs = mongoose.model("Jobs", jobSchema);

module.exports = Jobs;
