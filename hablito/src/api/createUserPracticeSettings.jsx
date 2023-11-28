import httpCommon from "../http-common";

export async function createUserPracticeSettings(userId) {
    console.log("Creating user practice settings for user Id: ", userId)

    try {
        // Make the API call to create user practice settings
        const response = await httpCommon.post(`/createuserpracticesettings/${userId}`, {
          userId: userId,
          // Add other properties as needed for user practice settings
        });
    
        // Check if the request was successful (status code 2xx)
        if (response.status >= 200 && response.status < 300) {
          console.log("User practice settings created successfully");
          // You might return additional data if needed
          return response.data;
        } else {
          console.error(`Failed to create user practice settings. Status: ${response.status}`);
          // You can throw an error or handle the failure in another way
          throw new Error(`Failed to create user practice settings. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error creating user practice settings:', error);
        // Rethrow the error for further handling or return null
        throw error;
      }
}