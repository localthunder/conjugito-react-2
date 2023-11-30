import React, { useState, useEffect } from 'react';
import VerbConjugator from './VerbConjugator';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsSidebar from './SettingsSidebar';
import { ListAlt } from '@mui/icons-material';
import VerbsScreen from './VerbsScreen';
import { AppBar, Toolbar, Button, IconButton, Typography, useMediaQuery } from '@mui/material';
import logo from '../assets/conjugito-round-logo.png'
import { fetchUserSettings } from '../api/fetchUserSettings';
import httpCommon from '../http-common';
import { getUserIdFromCookie } from '../cookies/getUserIdFromCookie';
import UseIsMobile from './UseIsMobile';

function ConjugationPracticeScreen() {
  const [userPracticeSettings, setUserPracticeSettings] = useState({ usevosotros: false });
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
    if (!showSettings) {
      // Settings sidebar is closing, add to the counter so that VerbConjugator re-renders
      setCounter((prevCounter) => prevCounter + 1)    }
  };

  const toggleVerbsScreen = () => {
    setShowVerbsScreen(!showVerbsScreen);
  };

  const fetchRandomVerb = async () => {
    try {
      const userId = getUserIdFromCookie()
      const settings = await fetchUserSettings(userId)
      console.log("settings are: ", settings)
      const response = await httpCommon.post('/randomverb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          showReflexiveVerbs: settings.showReflexiveVerbs,
          showIrregularVerbs: settings.showIrregularVerbs,
          showUncommonVerbs: settings.showUncommonVerbs,
          showCommonVerbs: settings.show_common_verbs,
          showRegularVerbs: settings.show_regular_verbs,
          reflexive: settings.showReflexiveVerbs
        },
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

  const vosotrosEnabled = userPracticeSettings.usevosotros
  
  const listOfVerbForms = ['yo', 'tu', 'el', 'nosotros', vosotrosEnabled && 'vosotros', 'ellos'].filter(Boolean);



  useEffect(() => {

    if (userPracticeSettings) {
      console.log("Creating a list of tenses based on userPracticeSettings...");

      // Extract tenses from userPracticeSettings
      const tensesFromSettings = Object.keys(userPracticeSettings).filter(
        (key) => userPracticeSettings[key] === true && key.startsWith("show") && !key.endsWith("Verbs") && !key.endsWith("_verbs")
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

  const [counter, setCounter] = useState(0);

  const isMobile = UseIsMobile();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ overflowY: 'hidden', position: 'relative' }}>
        {/* AppBar */}
      <AppBar position="static" sx={{ minHeight: 'auto'}}>
        <Toolbar disableGutters variant={isMobile ? 'dense' : 'regular'}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', fontFamily: 'SofiaProRegular, sans-serif' }}>
            <img src={logo} alt="Logo" style={{ height: '4vh', padding: '8px' }} />
            Hablito
          </Typography>
          {isMobile ? (
            <>
              <IconButton color="inherit" aria-label="All Verbs" onClick={toggleVerbsScreen} sx={{ marginRight: '1vw' }}>
                <ListAlt />
              </IconButton>
              <IconButton color="inherit" aria-label="Select Tenses" onClick={toggleSettings} sx={{ marginRight: '1vw' }}>
                <SettingsIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button color="inherit" variant="outlined" aria-label="Verbs" onClick={toggleVerbsScreen} style={{ borderRadius: '10vw', textTransform: 'none', marginRight: '1vw' }} >
                <ListAlt sx={{ marginRight: '0.5rem' }} />
                 Verbs 
              </Button>
              <Button color="inherit" variant="outlined" aria-label="Settings" onClick={toggleSettings} style={{ borderRadius: '10vw', textTransform: 'none', marginRight: '1vw'}}>
                <SettingsIcon sx={{ marginRight: '0.5rem' }} />
                Settings
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div>
        <VerbConjugator 
          randomVerb={randomVerb}
          randomTense={randomTense}
          randomVerbForm={randomVerbForm}
          resetScreen={resetScreen}
          counter={counter}
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
