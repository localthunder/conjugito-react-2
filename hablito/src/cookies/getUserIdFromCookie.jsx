export const getUserIdFromCookie = () => {
    // Check if the document object is available (running in a browser environment)
    if (typeof document !== 'undefined') {
      const cookieString = document.cookie;
      const userIdCookie = cookieString
        ? parseInt(cookieString.split('; ').find(row => row.startsWith('userId=')).split('=')[1], 10)
        : null;
  
      return userIdCookie;
    } else {
      console.error('Document object not available. Code is running in a non-browser environment.');
      return null;
    }
  };