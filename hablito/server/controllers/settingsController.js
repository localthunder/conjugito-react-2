import {db} from '../models/index.js';

console.log("Are user settings available? ", !!db.user_practice_settings);

  
export const getUserPracticeSettings = async (req, res) => {
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

export const updateUserSettings = async (req, res) => {
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

export default {
  updateUserSettings,
  getUserPracticeSettings
}
