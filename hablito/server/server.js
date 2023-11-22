import express from 'express';
import cors from 'cors';
import { sequelize } from './models/index.js';
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();

// Database
sequelize.sync()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // or '*' for any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


import verbRoutes from './routes/verbRoutes.js';
import tenseRoutes from './routes/tenseRoutes.js';
import settingRoutes from './routes/settingRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../dist')));

// Handle requests at the root path
app.get('/', (req, res) => {
  // Send the main HTML file from the 'dist' directory
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// ROUTES
app.use('/api', verbRoutes);
app.use('/api', tenseRoutes);
app.use('/api', settingRoutes);


// Use verbRouter, e.g., 
// app.use('/api/v1/verbs', verbRouter);

// Listening
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});