const db = require('../models');  // Ensure this path is correct.

// Before calling findAll:
console.log("Is Verb available? ", !!db.Verb);

exports.getAllVerbs = async (req, res) => {
  try {
    console.log('Verb Model:', db.Verb);  // Log to verify model.
    const verbs = await db.Verb.findAll();
    res.json(verbs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getRandomVerb = async (req, res) => {
  try {
    // Extracting user preferences from the request body
    const { showReflexiveVerbs, showIrregularVerbs, showUncommonVerbs } = req.body;

    // Define an empty where clause object
    let whereClause = {};

    // Update where clause based on user preferences
    if (showReflexiveVerbs === false) {
      whereClause.reflexive = false;
    }
    if (showIrregularVerbs === false) {
      whereClause.irregular = false;
    }
    if (showUncommonVerbs === false) {
      whereClause.common = true;
    }

    // Fetch all verbs based on the dynamic where clause
    const eligibleVerbs = await db.Verb.findAll({ where: whereClause });
    if (!eligibleVerbs.length) {
      return res.status(404).send('No eligible verbs found based on user settings');
    }

    // Select a random verb from eligibleVerbs and send it as a response
    const randomIndex = Math.floor(Math.random() * eligibleVerbs.length);
    const randomVerb = eligibleVerbs[randomIndex];
    
    res.json(randomVerb);
  } catch (error) {
    console.error("Error in getRandomVerb:", error.message, "\nStack Trace:", error.stack);
    res.status(500).send('Server error');
  }  
};


  exports.getConjugation = async (req, res) => {
    try {
      const { infinitive, tense, form } = req.body;
        
      // Log the available models in your db object
      console.log("Models available: ", Object.keys(db));
          
      // Log the parameters received to check their values
      console.log("Parameters received: ", infinitive, tense, form);
  
      console.log("Checking if db has tense: ", tense);

      // Ensure the provided tense is available as a model
      if (!db.sequelize.models[tense]) {
        return res.status(400).json({ error: `Tense "${tense}" is not recognized.` });
    }
    
        
      // Fetch conjugation from the appropriate tense model
      const conjugation = await db.sequelize.models[tense].findOne({
        where: {
          infinitive,
          // Using 'form' parameter to dynamically specify column
          [form]: {
            // Use NOT NULL condition to ensure a conjugation exists
            [db.Sequelize.Op.ne]: null
          }
        },
        attributes: [form]  // Limit columns fetched to just the requested form
      });
        
      // Log the constructed query for debugging
      console.log("Querying with: ", { infinitive, [form]: { [db.Sequelize.Op.ne]: null } });
      console.log("Conjugation returned as: ", { conjugation })
        
      if (!conjugation) {
        return res.status(404).json({ error: 'Conjugation not found.' });
      }
        
      res.json({ conjugation: conjugation[form] });
    } catch (error) {
      console.error('Error fetching conjugation data:', error);
      res.status(500).send('Server error');
    }
  };
  
  
      
//Controller for front end component to test db connection
exports.testDbConnection = async (req, res) => {
  try {
    await db.Verb.findOne();
    res.json({ status: 'success', message: 'Connected to the database' });
  } catch (error) {
    console.error('Database connection test failed:', error);
    res.status(500).json({ status: 'fail', message: 'Cannot connect to the database' });
  }
};
