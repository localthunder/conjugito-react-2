import React, { useState, useRef } from "react";
import { fetchConjugation } from "../api/fetchConjugation";
import TensePill from "./TensePill";
import Button from '@mui/material/Button';  // Import the Button component from Material-UI
import IconButton from '@mui/material/IconButton'; 
import VolumeUpIcon from '@mui/icons-material/VolumeUp'; 
import { TextField, Typography } from "@mui/material";
import { colors } from "../colors";
import theme from "../theme";

function VerbConjugator({ randomVerb, randomTense, randomVerbForm, resetScreen}) {
  const [inputValue, setInputValue] = useState('');
  const [buttonText, setButtonText] = useState('Check');  // New state variable for button text
  const [showEnglishInfinitive, setShowEnglishInfinitive] = useState(false);  // New state variable
  const [showConjugationAudio, setShowConjugationAudio] = useState(false);  // New state variable
  const conjugationAudioRef = useRef(null);  // New ref
  const inputRef = useRef();
  const [showMeDisabled, setShowMeDisabled] = useState (false);
  const [userAnswer, setUserAnswer] = useState ("unchecked");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCheckClick = async () => {
    // Call the utility function to get the conjugated verb
    const conjugated = await fetchConjugation(randomVerb.infinitive, randomTense, randomVerbForm);

    // Compare the conjugated verb with the user's input (inputValue) to check correctness.
    if (checkAnswer(inputValue, conjugated)) {
      setButtonText('Next');  
      setShowEnglishInfinitive(true)
      setInputValue(conjugated)
      setShowConjugationAudio(true);
      setShowMeDisabled(true);
      setUserAnswer('correct');
  } else {setUserAnswer('incorrect')}

    // Compare the conjugated verb with the user's input (inputValue) to check correctness.
    // Implement your check logic here.

    // Update the UI with the result of the check.
  };

  const handleShowMeClick = async () => {
    // Call the utility function to get the conjugated verb
    const conjugated = await fetchConjugation(randomVerb.infinitive, randomTense, randomVerbForm);

    // Display the conjugated verb to the user.
    setInputValue(conjugated);
    setButtonText('Next');  // Set button text to 'Next' after showing the correct answer
    setShowEnglishInfinitive(true)
    setShowConjugationAudio(true);
    setShowMeDisabled(true);
    setUserAnswer('shown');
  };

  const handleNextClick = () => {
    setInputValue("");
    setButtonText("Check");
    resetScreen();
    setShowEnglishInfinitive(false);
    setShowConjugationAudio(false);
    setShowMeDisabled(false);
    setUserAnswer('unchecked');
    inputRef.current.focus(); 
  };

  const audioRef = useRef(null);  // Create a ref to hold the audio element

  const handlePlaySound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleConjugationAudioClick = () => {
    if (conjugationAudioRef.current) {
      conjugationAudioRef.current.play();
    }
  };

  const handleEnterKey = () => {
    if (buttonText === "Next") {
      handleNextClick();
    } else {
      handleCheckClick();
    }
  };

  let textFieldColour = colors.Red404;

  if (userAnswer === 'unchecked') {
    textFieldColour = 'transparent';
  } else if (userAnswer === 'incorrect') {
    textFieldColour = colors.Red404;
  } else if (userAnswer === 'correct') {
    textFieldColour = colors.Green404;
  } else if (userAnswer === 'shown') {
    textFieldColour = 'transparent';
  } else {
    textFieldColour = colors.Pink80;
  }

  return (
    <div style={{ background: 'white', color: 'black', padding: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'calc(100vh - 264px)', overflowY: 'o' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '60px', marginBottom: '20px' }}>  
        <div style={{ width: '64px', height: '64px' }}>
          {/* Invisible div with the same dimensions as the icon button */}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '48px' }}>
          {/* New flex container */}
          <div style={{ display: 'flex', fontSize: '48px', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
            <Typography variant="h2" style={{fontFamily: 'SofiaProLight'}}>
              {randomVerb.infinitive}
            </Typography>
          </div>
          <div style={{ width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton color="primary" style={{ alignItems: 'center' }} aria-label="Play sound" component="span" onClick={handlePlaySound}>
              <VolumeUpIcon />
            </IconButton>
          </div>
        </div>
        </div>
        <div style={{ height: '48px', padding: '8px' }}>
          <p
            style={{
              fontSize: '16px',
              marginTop: '20px',
              visibility: showEnglishInfinitive ? 'visible' : 'hidden',
            }}
          >
            <Typography variant='h5' style={{fontFamily: 'SofiaProLight'}}>
              {randomVerb.englishInfinitive}
            </Typography>
          </p>
        </div>
        <div style={{ height: '32px', margin: '24px'}}>
          <TensePill 
          tense={randomTense}
          isDarkMode={ false } //NEED TO BUILD SOMETHING FOR DARKMODE HERE!!
        />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', gap: '8px', width: '40%' }}>
          {/* Fixed-width TextField from MUI, centered, does not grow or shrink */}
          <div style={{ flexGrow: 0, flexShrink: 0, width: '320px' }}>
            <TextField
                  value={inputValue}
                  onChange={handleInputChange}
                  variant="filled"
                  onKeyDown={(e) => {
                  if (e.key === "Enter"){
                    handleEnterKey()
                  }
                  }
                  }
                  label={randomVerbForm}
                  style={{ width: '100%'}}
                  InputProps={{
                    style: { paddingLeft: '2.4em', paddingRight: '1em', backgroundColor: textFieldColour, color: 'black', textAlign: 'center'},
                    autoFocus: true,
                    inputProps: {style: {textAlign: 'center'}},
                    endAdornment: (
                      <IconButton 
                      color= 'primary'
                      style={{ opacity: showConjugationAudio ? 1 : 0 }} 
                      aria-label="Play conjugation sound" 
                      component="span"
                      disabled={!showConjugationAudio}
                      onClick={handleConjugationAudioClick}>
                      <VolumeUpIcon style={{ fontSize: 20 }} />
                    </IconButton>              
                    )
                  }}
                  inputLabelProps={{
                    style: { color: 'white', width: '100%', textAlign: 'left' } // Style the label
                  }}
                  inputRef={inputRef}
            />
          </div>
        </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '320px', paddingTop: '20px' }}>
        <Button variant="text" color="primary" onClick={handleShowMeClick} disabled={showMeDisabled} style={{color: showMeDisabled ? theme.palette.primary.disabled : theme.palette.primary.main}}>
          Show Me
        </Button>
        <Button variant="contained" color="primary" onClick={buttonText === 'Next' ? handleNextClick : handleCheckClick}>
          {buttonText}
        </Button>
      </div>
      <audio ref={audioRef} src={`./audio/${randomVerb.infinitive}/${randomVerb.infinitive}.mp3`} preload="auto" />
      <audio ref={conjugationAudioRef} src={`./audio/${randomVerb.infinitive}/${randomTense}/${randomVerbForm}.mp3`} preload="auto" />
    </div>
  );
}

function unaccent(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function checkAnswer(answer, correctAnswer) {
  const cleanedAnswer = unaccent(answer.trim().toLowerCase());
  const cleanedCorrectAnswer = unaccent(correctAnswer);  

  return cleanedAnswer === cleanedCorrectAnswer;
}

export default VerbConjugator;
