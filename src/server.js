const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import cors package
const utilityRoutes = require('./routes/utilityRoutes');

const app = express();
require('dotenv').config();

// Enable CORS for all routes
app.use(cors({
    origin: process.env.FRONTEND_URL, // 'http://your-s3-website-url', // Replace with your actual S3 website URL
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', utilityRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});