import React, { useEffect, useState, useRef } from 'react';
import { Drawer, Container, Typography, ListItem, ListSubheader, Collapse, ListItemButton, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore, Close as CloseIcon, VolumeUp as VolumeUpIcon } from '@mui/icons-material';
import { colors } from '../colors';

const VerbScreen = ({ selectedVerb, openVerbScreen, setOpenVerbScreen }) => {
  const [open, setOpen] = useState({
    Present: true,
    Preterite: false,
    Future: false,
    Imperfect: false,
    Conditional: false,
    PresentPerfect: false,
    PreteritePerfect: false,
    FuturePerfect: false,
    ConditionalPerfect: false,
    Pluperfect: false,
    PresentSubjunctive: false,
    ImperfectSubjunctiveRa: false,
    ImperfectSubjunctiveSe: false,
    Imperative: false,
    NegativeImperative: false
  });

  const [verbData, setVerbData] = useState({});

  const handleClick = (tense) => {
    setOpen(prevOpen => ({ ...prevOpen, [tense]: !prevOpen[tense] }));
  };

  async function fetchVerbForTense(verb, tense) {
    try {
      // Convert tense to the format used in your routes (e.g., Present -> Present, Future -> Future, etc.)
      const formattedTense = tense.charAt(0).toUpperCase() + tense.slice(1);
      const response = await fetch(`/api/${formattedTense}/${verb}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(`data from server for ${tense}: `, data);
      setVerbData(prevData => ({
        ...prevData,
        [tense]: data,
      }));
    } catch (error) {
      console.error(`There has been a problem with your fetch operation for ${tense}:`, error);
    }
  }
  
  useEffect(() => {
    if (selectedVerb) {
      const tenses = ['Present', 'Preterite', 'Future', 'Imperfect', 'Conditional', 'PresentPerfect', 'PreteritePerfect', 'Pluperfect', 'FuturePerfect', 'ConditionalPerfect', 'PresentSubjunctive', 'ImperfectSubjunctiveRa', 'ImperfectSubjunctiveSe', 'Imperative', 'NegativeImperative'];
      tenses.forEach(tense => fetchVerbForTense(selectedVerb.infinitive, tense));
    }
  }, [selectedVerb]);

  const audioRef = useRef(null);  // Create a ref to hold the audio element
  
  const handlePlaySound = (src) => () => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.play();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={openVerbScreen}
      onClose={() => setOpenVerbScreen(false)}
    >
      <Container
        style={{ 
        width: '40vw', 
        minWidth: '300px',
        overflowX: 'auto',
        padding: '0px'      
      }}            
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px', paddingRight: '8px'}}>
          <IconButton
            color="inherit"
            onClick={() => setOpenVerbScreen(false)}
            style={{ 
              backgroundColor: 'rgba(211, 211, 211, 0.5)',
              borderRadius: '50%' 
            }}
          >
            <CloseIcon style={{ color: 'grey' }} />
          </IconButton>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', paddingTop: '16px', paddingBottom: '16px', alignItems: 'center', justifyContent: 'center' }}>  {/* Wrap the verb and play button in a flex container */}
            <Typography variant="h4">{selectedVerb.infinitive}</Typography>
            <IconButton color="primary" aria-label="Play infinitive sound" component="span" onClick={handlePlaySound(`./audio/${selectedVerb.infinitive}/${selectedVerb.infinitive}.mp3`)}>
              <VolumeUpIcon />
            </IconButton>
          </div>
          <div style={{paddingBottom: '16px'}}>
            <Typography variant="h6">{selectedVerb.englishInfinitive}</Typography>
          </div>

          {/* Repeat for each tense */}
          {['Present', 'Preterite', 'Future', 'Imperfect', 'Conditional', 'PresentPerfect', 'PreteritePerfect', 'Pluperfect', 'FuturePerfect', 'ConditionalPerfect', 'PresentSubjunctive', 'ImperfectSubjunctiveRa', 'ImperfectSubjunctiveSe', 'Imperative', 'NegativeImperative'].map(tense => (
          <React.Fragment key={tense}>
            <ListSubheader style={{ backgroundColor: colors.surfaceVariant, color: colors.onSurfaceVariant, textAlign: 'left' }}>
              <ListItemButton onClick={() => handleClick(tense)} style={{justifyContent: 'space-between' }}>
                {tense}
                {open[tense] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListSubheader>
            <Collapse in={open[tense]} timeout="auto" unmountOnExit>
              {['yo', 'tu', 'el/ella/usted', 'nosotros', 'vosotros', 'ellos/ellas/ustedes'].map((pronoun, index) => (
                <ListItem key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingLeft: '2em', paddingRight: '2em'}}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', verticalAlign: 'center', padding: '8px', margin: '8px' }}>
                  <div style={{display: 'flex', padding: '8x'}}>
                   <span style={{ fontSize: '0.8rem', color: 'gray' }}>{pronoun}</span>
                  </div>
                {/* Access the fetched data dynamically based on the tense */}
                    <span style={{marginLeft:'0.5em', fontSize: '1.2em'}}>
                      <Typography style={{fontSize: '1.1em'}}>
                        {verbData[tense]?.[pronoun.split('/')[0]]}
                      </Typography>
                    </span>    
                  </div>       
                  <IconButton color="primary" aria-label="Play conjugation sound" component="span" onClick={handlePlaySound(`./audio/${selectedVerb.infinitive}/${tense}/${pronoun.split('/')[0]}.mp3`)} style={{ padding: '5px' }}>
                    <VolumeUpIcon style={{ fontSize: '1rem' }} />  
                </IconButton>
                </div>
              </ListItem>
              ))}
            </Collapse>
          </React.Fragment>
        ))}
        <audio ref={audioRef} preload="auto" />
        </div>
      </Container>
    </Drawer>
  );
};

export default VerbScreen;