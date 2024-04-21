const express = require('express')
const app = express()
const port = 5000

// Calling Routes
const createuser = require("./Routes/createuser")
const loginuser = require("./Routes/loginuser")
const jobpost = require("./Routes/jobpost")
const displayData = require("./Routes/getData")
const deleteData = require("./Routes/deleteData")
const Mailer = require("./Routes/Mailer")

// Database connection
const mongoDB = require('./mongodb')
mongoDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
    next();
})

// Routes
app.use(express.json({ limit: '16mb' }));
app.use('/api', createuser);
app.use('/api', loginuser);
app.use('/api', jobpost);
app.use('/api', displayData);
app.use('/api', deleteData);

app.use('/api', Mailer)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Genie Hire's listening on port ${port}`)
})