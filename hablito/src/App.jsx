import './App.css';
import ConjugationPracticeScreen from './components/ConjugationPracticeScreen';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="Conjugito" style={{overflowY:'hidden'}}>
        <header className="Hablito - Practice Spanish Verb Conjugation">
          <ConjugationPracticeScreen />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
