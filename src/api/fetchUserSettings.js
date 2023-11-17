
export async function fetchUserSettings(userId) {

    console.log("Fetching user settings...");

    try {
    const response = await fetch(`/api/userpracticesettings/${userId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
    }
    const data = await response.json();

    return (data)

} catch (error) {
    console.error('Error fetching user settings:', error);
    throw error; // Rethrow the error for further handling
}

};