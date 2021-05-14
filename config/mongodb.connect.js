const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log('Connected to MongoDB Server')
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;