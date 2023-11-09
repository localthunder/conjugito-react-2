import React, { useState } from 'react';
import { Drawer, Typography, List, ListItem, ListItemText, Switch, Divider, Button } from '@mui/material';

const SettingsSidebar = ({ open, onClose, settings}) => {
  const [reflexiveVerbs, setReflexiveVerbs] = useState(settings.showReflexiveVerbs);
  const [uncommonVerbs, setUncommonVerbs] = useState(settings.showUncommonVerbs);
  const [presentTense, setPresentTense] = useState(settings.showPresent);
  const [preteriteTense, setPreteriteTense] = useState(settings.showPreterite);
  const [futureTense, setFutureTense] = useState(settings.showFuture);
  const [imperfectTense, setImperfectTense] = useState(settings.showImperfect);
  const [conditionalTense, setConditionalTense] = useState(settings.showConditional);
  const [presentPerfectTense, setPresentPerfectTense] = useState(settings.showPresentPerfect);
  const [pluperfectTense, setPluperfectTense] = useState(settings.showPluperfect);
  const [futurePerfectTense, setFuturePerfectTense] = useState(settings.showFuturePerfect);
  const [conditionalPerfectTense, setConditionalPerfectTense] = useState(settings.showConditionalPerfect);
  const [preteritePerfectTense, setPreteritePerfectTense] = useState(settings.showPreteritePerfect);
  const [presentSubjunctiveTense, setPresentSubjunctiveTense] = useState(settings.showPresentSubjunctive);
  const [imperfectSubjunctiveTenseRa, setImperfectSubjunctiveTenseRa] = useState(settings.showImperfectSubjunctiveRa);
  const [imperfectSubjunctiveTenseSe, setImperfectSubjunctiveTenseSe] = useState(settings.showImperfectSubjunctiveSe);
  const [imperativeMood, setImperativeMood] = useState(settings.showImperative);
  const [negativeImperativeMood, setNegativeImperativeMood] = useState(settings.showNegativeImperative);
  
  const handleSaveChanges = async () => {
    try {
      const userId = 1 // MUST CHANGE
      
      // Make the API call
      await fetch(`/api/updateuserpracticesettings/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          showReflexiveVerbs: reflexiveVerbs,
          showUncommonVerbs: uncommonVerbs,
          showPresent: presentTense,
          showPreterite: preteriteTense,
          showFuture: futureTense,
          showImperfect: imperfectTense,
          showConditional: conditionalTense,
          showPresentPerfect: presentPerfectTense,
          showPreteritePerfect: preteritePerfectTense,
          showFuturePerfect: futurePerfectTense,
          showConditionalPerfect: conditionalPerfectTense,
          showPluperfect: pluperfectTense,
          showPresentSubjunctive: presentSubjunctiveTense,
          showImperfectSubjunctiveRa: imperfectSubjunctiveTenseRa,
          showImperfectSubjunctiveSe: imperfectSubjunctiveTenseSe,
          showImperative: imperativeMood,
          showNegativeImperative: negativeImperativeMood
        })
      });

      onClose(); // Close the sidebar after saving
  
      // Handle success, if needed. E.g., notify the user that settings were saved.
    } catch (error) {
      // Handle error and notify the user
      console.error('Failed to update settings:', error);
      // Optionally show a notification to the user
    }
  }

    const handleCloseAndSave = () => {
    handleSaveChanges();  // Save changes when sidebar is closed
    onClose();  // Close the sidebar
  }

  return (
    <Drawer anchor="right" open={open} onClose={handleCloseAndSave}>
    <div style={{ width: 350, padding: '20px', overflowX: 'hidden', overflowY: 'auto', height: '100vh' }}>
        <Typography variant="h4" gutterBottom>Settings</Typography>
        <Divider />

        <List>
        <Typography variant="h6">Verbs</Typography>
          <ListItem>
            <ListItemText primary="Reflexive verbs" />
            <Switch 
              checked={reflexiveVerbs} 
              onChange={(event) => setReflexiveVerbs(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Uncommon verbs" />
            <Switch 
              checked={uncommonVerbs} 
              onChange={(event) => setUncommonVerbs(event.target.checked)} 
            />
          </ListItem>

          <Divider />
          <Typography variant="h6">Indicative tenses</Typography>
          <ListItem>
            <ListItemText primary="Present tense" />
            <Switch 
              checked={presentTense} 
              onChange={(event) => setPresentTense(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Preterite tense" />
            <Switch 
              checked={preteriteTense} 
              onChange={(event) => setPreteriteTense(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Future tense" />
            <Switch 
              checked={futureTense} 
              onChange={(event) => setFutureTense(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Imperfect tense" />
            <Switch 
              checked={imperfectTense} 
              onChange={(event) => setImperfectTense(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Conditional tense" />
            <Switch 
              checked={conditionalTense} 
              onChange={(event) => setConditionalTense(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Present perfect tense" />
            <Switch 
              checked={presentPerfectTense} 
              onChange={(event) => setPresentPerfectTense(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Pluperfect tense" />
            <Switch 
              checked={pluperfectTense} 
              onChange={(event) => setPluperfectTense(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Future perfect tense" />
            <Switch 
              checked={futurePerfectTense} 
              onChange={(event) => setFuturePerfectTense(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Conditional perfect tense" />
            <Switch 
              checked={conditionalPerfectTense} 
              onChange={(event) => setConditionalPerfectTense(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Preterite perfect tense" />
            <Switch 
              checked={preteritePerfectTense} 
              onChange={(event) => setPreteritePerfectTense(event.target.checked)} 
            />
          </ListItem>

          <Divider />
          <Typography variant="h6">Subjunctive tenses</Typography>
          <ListItem>
            <ListItemText primary="Present subjunctive tense" />
            <Switch 
              checked={presentSubjunctiveTense} 
              onChange={(event) => setPresentSubjunctiveTense(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Imperfect subjunctive tense (Ra)" />
            <Switch 
              checked={imperfectSubjunctiveTenseRa} 
              onChange={(event) => setImperfectSubjunctiveTenseRa(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Imperfect subjunctive tense (Se)" />
            <Switch 
              checked={imperfectSubjunctiveTenseSe} 
              onChange={(event) => setImperfectSubjunctiveTenseSe(event.target.checked)} 
            />
          </ListItem>

          <Divider />
          <Typography variant="h6">Imperative moods</Typography>
          <ListItem>
            <ListItemText primary="Imperative" />
            <Switch 
              checked={imperativeMood} 
              onChange={(event) => setImperativeMood(event.target.checked)} 
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Negative imperative" />
            <Switch 
              checked={negativeImperativeMood} 
              onChange={(event) => setNegativeImperativeMood(event.target.checked)} 
            />
          </ListItem>
        </List>
        <div style={{ position: 'sticky', bottom: 0, backgroundColor: 'white', padding: '20px', borderTop: '1px solid #ccc'  }}>
         <Button onClick={handleSaveChanges} variant="contained" color="primary">
            Save Changes
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default SettingsSidebar;
