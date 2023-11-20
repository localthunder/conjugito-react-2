export async function fetchConjugation(infinitive, tense, form) {
  try {
    const response = await fetch('/api/conjugation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ infinitive, tense, form }),
    });
    const data = await response.json();
    
    console.log("Data received from /api/conjugation:", data);

    return data.conjugation  ;
  } catch (error) {
    console.error('Error fetching conjugation data:', error);
    return null;
  }
}
