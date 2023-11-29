import React, { useState } from 'react';
import { Drawer, Container, Typography, List, ListItem, ListItemText, Switch, Divider, Button, IconButton, Snackbar} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import httpCommon from '../http-common';
import { getUserIdFromCookie } from '../cookies/getUserIdFromCookie';
import UseIsMobile from './UseIsMobile';

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
      const userId = getUserIdFromCookie();
      
      // Make the API call
      await httpCommon.post(`/updateuserpracticesettings/${userId}`, {
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
        });

      if(!areAnyTensesSelected()){
        setSnackbarOpen(true)
      } else {
        onClose(); // Close the sidebar after saving
      }  
      // Handle success, if needed. E.g., notify the user that settings were saved.
    } catch (error) {
      // Handle error and notify the user
      console.error('Failed to update settings:', error);
      // Optionally show a notification to the user
    }
  }

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const areAnyTensesSelected = () => {
    const tenseSwitchStates = [
      presentTense,
      preteriteTense,
      futureTense,
      imperfectTense,
      conditionalTense,
      presentPerfectTense,
      pluperfectTense,
      futurePerfectTense,
      conditionalPerfectTense,
      preteritePerfectTense,
      presentSubjunctiveTense,
      imperfectSubjunctiveTenseRa,
      imperfectSubjunctiveTenseSe,
      imperativeMood,
      negativeImperativeMood,
    ];

    return tenseSwitchStates.some((tenseSwitch) => tenseSwitch);
  };

  const handleCloseAndSave = () => {
    // Check if at least one tense is selected
    if (!areAnyTensesSelected()) {
      // Show error Snackbar
      setSnackbarOpen(true);
    } else {
      // Save changes and close the sidebar
      handleSaveChanges();
    }
  };

  const isMobile = UseIsMobile()

  return (
    <Drawer anchor="right" open={open} onClose={handleCloseAndSave}>
      <Container
        style={{ 
        width: isMobile ? '100vw' : '30vw', 
        minWidth: '300px',
        overflowX: 'auto',
        padding: '0px'      
      }}            
      >
    <div style={{ 
      paddingLeft: '20px', 
      paddingRight: '20px', 
      paddingBottom: '20px', 
      paddingTop: '0px', 
      height: '100vh',
      overflowY: 'auto',  // Make sure the content is scrollable
      backgroundColor: 'white',
      boxShadow: '0px 8px 10px -5px #9E9E9E',  // Add box shadow to separate it from the rest of the content
      }}>
    <div style={{position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', paddingTop: '20px', paddingBottom: '16px' }}>
          <Typography variant="h4" >
              Settings
          </Typography>
          <IconButton
              color="inherit"
              onClick={() => handleCloseAndSave()}
              style={{ 
              backgroundColor: 'rgba(211, 211, 211, 0.5)',
              borderRadius: '50%' 
              }}
          >
              <CloseIcon style={{ color: 'grey' }} />
          </IconButton>
      </div>  
      <Divider />
    </div>      
        <List>
        <Typography variant="h6" paddingTop={'16px'} >Verbs</Typography>
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
          <Typography variant="h6" paddingTop={'16px'}>Indicative tenses</Typography>
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
          <Typography variant="h6" paddingTop={'16px'}>Subjunctive tenses</Typography>
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
          <Typography variant="h6" paddingTop={'16px'}>Imperative moods</Typography>
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
        <div style={{ position: '-webkit-sticky, sticky', bottom: 0, backgroundColor: 'white', padding: '20px', borderTop: '1px solid #ccc' }}>
         <Button onClick={handleSaveChanges} variant="contained" color="primary">
            Save Changes
          </Button>
        </div>
      </div>
      </Container>
            {/* Snackbar for error message */}
            <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="At least one tense must be selected."
        action={
          <>
            <Button color="inherit" size="small" onClick={handleSnackbarClose}>
              Dismiss
            </Button>
          </>
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Set anchor origin to bottom right
      />
    </Drawer>
  );
};

export default SettingsSidebar;
