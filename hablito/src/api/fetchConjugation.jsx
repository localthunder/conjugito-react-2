import httpCommon from "../http-common";

export async function fetchConjugation(infinitive, tense, form) {
  try {
    const response = await httpCommon.post('/conjugation', { infinitive, tense, form });
    const data = response.data;

    console.log("Data received from /api/conjugation:", data);

    return data.conjugation;
  } catch (error) {
    console.error('Error fetching conjugation data:', error);
    return null;
  }
}

