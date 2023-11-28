import React, { useState, useEffect } from 'react';
import VerbConjugator from './VerbConjugator';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsSidebar from './SettingsSidebar';
import { ListAlt } from '@mui/icons-material';
import VerbsScreen from './VerbsScreen';
import { AppBar, Toolbar, Button, IconButton, Typography } from '@mui/material';
import logo from '../assets/conjugito-round-logo.png'
import { fetchUserSettings } from '../api/fetchUserSettings';
import httpCommon from '../http-common';
import { getUserIdFromCookie } from '../cookies/getUserIdFromCookie';


function ConjugationPracticeScreen() {
  const [userPracticeSettings, setUserPracticeSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomVerb, setRandomVerb] = useState('');
  const [randomVerbForm, setRandomVerbForm] = useState('');
  const [listOfTenses, setListOfTenses] = useState([]);
  const [randomTense, setRandomTense] = useState('');

  const [showSettings, setShowSettings] = useState(false);
  const [showVerbsScreen, setShowVerbsScreen] = useState(false);


  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleVerbsScreen = () => {
    setShowVerbsScreen(!showVerbsScreen);
  };

  const listOfVerbForms = ['yo', 'tu', 'el', 'nosotros', 'vosotros', 'ellos'];

  const fetchRandomVerb = async () => {
    try {
      const response = await httpCommon.post('/randomverb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          showReflexiveVerbs: userPracticeSettings.showReflexiveVerbs,
          showIrregularVerbs: userPracticeSettings.showIrregularVerbs,
          showUncommonVerbs: userPracticeSettings.showUncommonVerbs,
        }),
      });
  
      if (response.status !== 200) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      const result = await response.data;
      setRandomVerb(result);
    } catch (error) {
      console.error("Error fetching random verb:", error);
    }
  };

  useEffect(() => {
    const userId = getUserIdFromCookie();
  
    const fetchData = async () => {
      try {
        const data = await fetchUserSettings(userId);
        setUserPracticeSettings(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [showSettings]);
  


  useEffect(() => {

    if (userPracticeSettings) {
      console.log("Creating a list of tenses based on userPracticeSettings...");

      // Extract tenses from userPracticeSettings
      const tensesFromSettings = Object.keys(userPracticeSettings).filter(
        (key) => userPracticeSettings[key] === true && key.startsWith("show") && !key.endsWith("Verbs")
      );

      const tenseNames = tensesFromSettings.map((tense) => tense.slice(4));
      setListOfTenses(tenseNames);      
    }
  }, [userPracticeSettings]);

  useEffect(() => {
    console.log("Fetching random verb...");

    if (listOfTenses.length > 0) {
      const randomVerbFormIndex = Math.floor(Math.random() * listOfVerbForms.length);
      setRandomVerbForm(listOfVerbForms[randomVerbFormIndex]);
  
      const randomTenseIndex = Math.floor(Math.random() * listOfTenses.length);
      setRandomTense(listOfTenses[randomTenseIndex]);

      fetchRandomVerb();
    }
  }, [listOfTenses]);
  
  const resetScreen = () => {
    setRandomVerb('');
    setRandomVerbForm('');
    setRandomTense('');
    
    const randomVerbFormIndex = Math.floor(Math.random() * listOfVerbForms.length);
    setRandomVerbForm(listOfVerbForms[randomVerbFormIndex]);
    
    const randomTenseIndex = Math.floor(Math.random() * listOfTenses.length);
    setRandomTense(listOfTenses[randomTenseIndex]);

    fetchRandomVerb();

  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ overflowY: 'hidden', position: 'relative' }}>
        {/* AppBar */}
            <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', fontFamily: 'SofiaProRegular, sans-serif' }}>
            <img src={logo} alt="Logo" style={{ height: '48px', padding: '12px' }} />
            Hablito
          </Typography>
          <Button color="inherit" variant="outlined" aria-label="All Verbs" onClick={toggleVerbsScreen} sx={{ flexDirection: 'column', borderRadius: '10vw', marginRight: '1vw' }}>
            <div style={{ textAlign: 'center', textTransform: 'none' }}>All Verbs</div>
          </Button>
          <Button color="inherit" variant="outlined" aria-label="Select Tenses" onClick={toggleSettings} sx={{ flexDirection: 'column', borderRadius: '10vw' }}>
            <div style={{ textAlign: 'center', textTransform: 'none' }}>Select Tenses</div>
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        <VerbConjugator 
          randomVerb={randomVerb}
          randomTense={randomTense}
          randomVerbForm={randomVerbForm}
          resetScreen={resetScreen}
        />
      </div>

    {/* Settings Side Tray */}
    <SettingsSidebar settings={userPracticeSettings} open={showSettings} onClose={toggleSettings} />

    {/* VerbScreen Side Tray */}
    <VerbsScreen showVerbsScreen={showVerbsScreen}  setShowVerbsScreen={toggleVerbsScreen} />

  </div>
  );  
}

export default ConjugationPracticeScreen;
