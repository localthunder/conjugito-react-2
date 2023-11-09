import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DatabaseConnectionTest() {
    const [isConnected, setIsConnected] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
  
    useEffect(() => {
        axios.get('/api/verbs')
          .then(response => {
            if (response.data && Array.isArray(response.data)) {
              setIsConnected(true);
            } else {
              setIsConnected(false);
              setErrorMessage('Received unexpected data format');
            }
          })
          .catch(error => {
            setIsConnected(false);
            setErrorMessage(`Error: ${error.message || 'Unknown error'}`);
            console.error('Error connecting to the database:', error);
          });
    }, []);
  
    return (
      <div>
        <h2>Database Connection Test</h2>
        {isConnected ? (
          <p>The app is connected to the database.</p>
        ) : (
          <>
            <p>Connection to the database failed.</p>
            <p>{errorMessage}</p>
          </>
        )}
      </div>
    );
}

export default DatabaseConnectionTest;
