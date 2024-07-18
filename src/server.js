import express, { json, urlencoded } from 'express';
import cors from 'cors';  // Import cors package
import dotenv from 'dotenv';

// Add authentication (firebase)
// import { authenticate } from './auth/firebase.js'; 

// Enable API documentation (Swagger)
import { serve, setup } from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

// Load database connection information
import utilityRouter from './routes/utilityCRUDroutes.js';
import packageJson from '../package.json' assert { type: 'json' };
import sequelize from './config/db.config.js';
import './models/associations.js'; // Import associations

import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const api_path = `${__dirname}/routes`;

// Initialize the app
const app = express();
dotenv.config();

// Middleware setup:
// 1) Enable CORS for all routes
const corsOptions = {
    origin: process.env.FRONTEND_URL, // 'http://your-s3-website-url', // Replace with your actual S3 website URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    credentials: true,
};
app.use(cors(corsOptions));

// 2) Parse requests of content-type - application/json
app.use(json());

// 3) Parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));


// APIs documentation:
// Get some info from package.json
const { description, version } = packageJson;
console.log(`Description: ${description}, Version: ${version}`);

const swaggerDefinition = { 
    openapi: '3.0.0',
    info: {
        description,
        title: 'Simple Home Utilities management tool - API Definitions',
        version,
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
};

const swaggerOptions = {
    swaggerDefinition,
    apis: [`${api_path}/*.js`],
    customSiteTitle: 'UtilitiesExpress by Jose L. Ulloa',
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', serve, setup(swaggerSpecs));

// Routes Setup
app.use('/api/', utilityRouter);

// Sync database (this step is optional )
sequelize.sync({ force: false }) // Set to true to drop and recreate tables on server restart
    .then(() => {
        console.log('Database synced');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


// // for building (see https://dev.to/gregpetropoulos/render-deployment-free-tier-of-mern-app-52mk)
// if (process.env.NODE_ENV === 'production') {
//     //*Set static folder up in production
//     app.use(express.static('../frontend/build'));
//     app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build','index.html')));
//   }
