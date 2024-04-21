const mongoose = require('mongoose');
const {ServerApiVersion} = require('mongodb');
// Connecting mongodb database using uri
// const mongodbURI = "mongodb+srv://krishnagupta5124:KrishnaGenieHire1234@geniehires.gvad54f.mongodb.net/GenieHires?retryWrites=true&w=majority&appName=GenieHires";

const mongodbURI = "mongodb://localhost:27017/GenieHires";

const mongoDB = async() => {
    try {
        await mongoose.connect(mongodbURI,  {serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error + "Connection Unsuccessful");
    };
}

module.exports = mongoDB;