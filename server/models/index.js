require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];

// Define the `db` object at the top-level scope of the module to ensure it's available throughout.
const db = {};

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

fs
  .readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== 'index.js' &&
    file.slice(-3) === '.js' // Adjusted this line
  ))
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const model = require(modelPath)(sequelize, Sequelize.DataTypes);
    // Derive the model name without ".model"
    const modelName = file.slice(0, -3); // Adjusted this line
    db[modelName] = model;
  });
  console.log("Loaded models: ", Object.keys(db));


// Optional: Any associations can go here if they're not defined in the individual model files.

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync({ force: false })  // Be cautious with `force: true` as it will drop tables
    .then(() => {
        console.log('Database & tables created!');
    });

module.exports = db; // Exporting `db` directly, as all models are properties of `db`.
