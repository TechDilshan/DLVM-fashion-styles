const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();


//const sampleRoutes = require('./routes/sampleRoutes');

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    }
};

connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
