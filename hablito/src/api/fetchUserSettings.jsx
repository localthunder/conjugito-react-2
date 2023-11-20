export async function fetchUserSettings(userId) {
    console.log("Fetching user settings...");

    try {
        const response = await fetch(`/api/userpracticesettings/${userId}`);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            return data;
        } else {
            const htmlData = await response.text();
            console.error('Received HTML response instead of JSON:', htmlData);
            // You can handle HTML response appropriately or throw an error
            throw new Error('Unexpected HTML response received');
        }
    } catch (error) {
        console.error('Error fetching user settings:', error);
        throw error; // Rethrow the error for further handling
    }
}