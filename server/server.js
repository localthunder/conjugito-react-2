require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const express = require('express');
const cors = require("cors");
const db = require("./models");
const app = express();

// Database
db.sequelize.sync()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const verbRoutes = require('./routes/verbRoutes')
const tenseRoutes = require('./routes/tenseRoutes')
const settingRoutes = require('./routes/settingRoutes')

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