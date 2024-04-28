const mongoose = require('mongoose');
require("dotenv").config();
mongoose.set('strictQuery', false);

mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => console.log('Connected to MongoDB Atlas'))
        .catch((error) => console.error);

module.exports = mongoose;