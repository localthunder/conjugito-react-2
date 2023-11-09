const db = require('../models');

console.log("Are user settings available? ", !!db.user_practice_settings);

// Add a console log to query the data
db.user_practice_settings.findOne({
  where: { user_id: 1 }, // Assuming the user_id is the correct field name
})
  .then((userSettings) => {
    if (userSettings) {
      console.log("User settings found:", userSettings.toJSON());
    } else {
      console.log("User settings not found.");
    }
  })
  .catch((error) => {
    console.error("Error querying user settings:", error);
  });
  
exports.getUserPracticeSettings = async (req, res) => {
  console.log("Inside the getUserPracticeSettings controller");

  const userId = req.params.userId;
  try {
    const userSettings = await db.user_practice_settings.findOne({ where: { user_id: userId } });
    if (!userSettings) {
      return res.status(404).json({ error: "User settings not found." });
    }
    res.json(userSettings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.updateUserSettings = async (req, res) => {
  try {
    const { userId } = req.params;
    let settings = await db.user_practice_settings.findOne({ where: { user_id: userId } });
    if (!settings) {
      return res.status(404).send('Settings not found');
    }
    settings = await settings.update(req.body);
    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
