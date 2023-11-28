import httpCommon from "../http-common";

export async function fetchUserSettings(userId) {
    console.log("Fetching user settings...");

    try {
        const response = await httpCommon.get(`/userpracticesettings/${userId}`);

        if (response.status !== 200) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            const data = await response.data;
            return data;
        } else {
            const htmlData = await response.data;
            console.error('Received HTML response instead of JSON:', htmlData);
            // You can handle HTML response appropriately or throw an error
            throw new Error('Unexpected HTML response received');
        }
    } catch (error) {
        console.error('Error fetching user settings:', error);
        throw error; // Rethrow the error for further handling
    }
}