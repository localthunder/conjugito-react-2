import React, { useEffect, useState, useRef } from 'react';
import { Drawer, Typography, List, ListItem, ListSubheader, Collapse, ListItemButton, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore, VolumeUp as VolumeUpIcon } from '@mui/icons-material';

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
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>  {/* Wrap the verb and play button in a flex container */}
          <Typography variant="h4">{selectedVerb.infinitive}</Typography>
          <IconButton color="primary" aria-label="Play infinitive sound" component="span" onClick={handlePlaySound(`./audio/${selectedVerb.infinitive}/${selectedVerb.infinitive}.mp3`)}>
            <VolumeUpIcon />
          </IconButton>
        </div>
        <Typography variant="h6">{selectedVerb.englishInfinitive}</Typography>

        {/* Repeat for each tense */}
        {['Present', 'Preterite', 'Future', 'Imperfect', 'Conditional', 'PresentPerfect', 'PreteritePerfect', 'Pluperfect', 'FuturePerfect', 'ConditionalPerfect', 'PresentSubjunctive', 'ImperfectSubjunctiveRa', 'ImperfectSubjunctiveSe', 'Imperative', 'NegativeImperative'].map(tense => (
        <React.Fragment key={tense}>
          <ListSubheader style={{ backgroundColor: 'gray', textAlign: 'left' }}>
            <ListItemButton onClick={() => handleClick(tense)}>
              {tense}
              {open[tense] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListSubheader>
          <Collapse in={open[tense]} timeout="auto" unmountOnExit>
            {['yo', 'tu', 'el/ella/usted', 'nosotros', 'vosotros', 'ellos/ellas/ustedes'].map((pronoun, index) => (
              <ListItem key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              {pronoun}
              {/* Access the fetched data dynamically based on the tense */}
              {JSON.stringify(verbData[tense]?.[pronoun.split('/')[0]])}
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
    </Drawer>
  );
};

export default VerbScreen;