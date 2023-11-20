import { colors } from '../colors';

function TensePill({ tense, isDarkMode }) {
    // Define a mapping of tenses to their corresponding text
    const tenseMapping = {
      "Present": "Present",
      "Preterite": "Preterite",
      "Future": "Future",
      "Imperfect": "Imperfect",
      "Conditional": "Conditional",
      "PresentPerfect": "Present Perfect",
      "PreteritePerfect": "Preterite Perfect",
      "FuturePerfect": "Future Perfect",
      "ConditionalPerfect": "Conditional Perfect",
      "Pluperfect": "Pluperfect",
      "Imperative": "Imperative",
      "NegativeImperative": "Negative Imperative",
      "PresentSubjunctive": "Present Subjunctive",
      "ImperfectSubjunctiveRa": "Imperfect Subjunctive (Ra)",
      "ImperfectSubjunctiveSe": "Imperfect Subjunctive (Se)",
    };

  const getTensePillColor = (tense, isDarkMode) => {
    switch (tense) {
      case 'Present':
        return isDarkMode ? colors.Present30 : colors.Present90;
      case 'Preterite':
        return isDarkMode ? colors.Preterite30 : colors.Preterite90;
      case 'Future':
        return isDarkMode ? colors.Future30 : colors.Future90;
      case 'Imperfect':
        return isDarkMode ? colors.Imperfect30 : colors.Imperfect90;
      case 'Conditional':
        return isDarkMode ? colors.Conditional30 : colors.Conditional90;
      case 'PresentPerfect':
        return isDarkMode ? colors.PresentPerfect30 : colors.PresentPerfect90;
      case 'PreteritePerfect':
        return isDarkMode ? colors.Preterite80 : colors.Preterite40;
      case 'FuturePerfect':
        return isDarkMode ? colors.Future80 : colors.Future40;
      case 'ConditionalPerfect':
        return isDarkMode ? colors.Conditional80 : colors.Conditional40;
      case 'Pluperfect':
        return isDarkMode ? colors.Pluperfect30 : colors.Pluperfect90;
      case 'Imperative':
        return isDarkMode ? colors.Imperative30 : colors.Imperative90;
      case 'NegativeImperative':
        return isDarkMode ? colors.NegativeImperative30 : colors.NegativeImperative90;
      case 'PresentSubjunctive':
        return isDarkMode ? colors.Present80 : colors.Present40;
      case 'ImperfectSubjunctiveRa':
        return isDarkMode ? colors.Future80 : colors.Future40;
      case 'ImperfectSubjunctiveSe':
        return isDarkMode ? colors.Conditional80 : colors.Conditional40;
      default:
        return '#defaultColor';  // Replace with actual default color
    }
};

const getTenseTextColor = (tense, isDarkMode) => {
  switch (tense) {
    case 'Present': return isDarkMode ? colors.Present90 : colors.Present10;
    case 'Preterite': return isDarkMode ? colors.Preterite90 : colors.Preterite10;
    case 'Future': return isDarkMode ? colors.Future90 : colors.Future10;
    case 'Imperfect': return isDarkMode ? colors.Imperfect90 : colors.Imperfect10;
    case 'Conditional': return isDarkMode ? colors.Conditional90 : colors.Conditional10;
    case 'PresentPerfect': return isDarkMode ? colors.PresentPerfect90 : colors.PresentPerfect10;
    case 'PreteritePerfect': return isDarkMode ? colors.Preterite20 : colors.Preterite100;
    case 'FuturePerfect': return isDarkMode ? colors.Future20 : colors.Future100;
    case 'ConditionalPerfect': return isDarkMode ? colors.Conditional20 : colors.Conditional100;
    case 'Pluperfect': return isDarkMode ? colors.Pluperfect90 : colors.Pluperfect10;
    case 'Imperative': return isDarkMode ? colors.Imperative90 : colors.Imperative10;
    case 'NegativeImperative': return isDarkMode ? colors.NegativeImperative90 : colors.NegativeImperative10;
    case 'PresentSubjunctive': return isDarkMode ? colors.Present20 : colors.Present100;
    case 'ImperfectSubjunctiveRa': return isDarkMode ? colors.Future20 : colors.Future100;
    case 'ImperfectSubjunctiveSe': return isDarkMode ? colors.Conditional20 : colors.Conditional100;
    default: return '#000000';  // Replace with an actual default color if required
  }
};

// Define pill style
const pillStyle = (tense, isDarkMode) => ({
  display: 'inline-block',
  padding: '10px 20px',
  borderRadius: '50px',
  backgroundColor: getTensePillColor(tense, isDarkMode),
  color: getTenseTextColor(tense, isDarkMode),  // Using the new text color function here
  fontSize: '12px',
  textAlign: 'center',
});

return (
  <div style={pillStyle(tense, isDarkMode)}>
    {tenseMapping[tense]}
  </div>
);
}

export default TensePill;