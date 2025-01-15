import axios from 'axios';
import md5 from 'md5'; // Import the MD5 library


// Base URL for the API
const API_BASE_URL = 'http://localhost:5000'; // Replace with your actual server URL

/**
 * Sends a login request to the server.
 * @param {string} name - The user's name.
 * @returns {Promise<Object>} The server response containing success status and partner's thermometer level.
 */

export const sendLoginRequest = async (name) => {
    try {
      // Hash the name using MD5
      const hashedName = md5(name);
  
      // Log the request body
      console.log('Request Body:', { name: hashedName });
  
      // Send the hashed name in the request body
      const response = await axios.post(`${API_BASE_URL}/getCouple`, {
        name: hashedName,
      });
  
      // Log the response data
      console.log('Response Data:', response.data);
  
      // Return the partner's level from the response
      return {
        success: true,
        partnerThermometer: response.data.partnerLevel, // Map partnerLevel to partnerThermometer
      };
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };


/**
 * Updates the user's thermometer level on the server.
 * @param {string} name - The user's name.
 * @param {number} level - The updated thermometer level.
 * @returns {Promise<Object>} The server response containing success status.
 */

export const updateThermometer = async (name, level) => {
  try {
    // Hash the name using MD5
    const hashedName = md5(name);

    // Log the request payload for debugging
    console.log('Request Body:', { name: hashedName, level });

    // Send the POST request with the hashed name
    const response = await axios.post(`${API_BASE_URL}/updateMyLevel`, {
      name: hashedName,
      level,
    });

    // Check the response status
    if (response.status === 200) {
      console.log('Response Status: 200 - Success');
      return { success: true };
    } else if (response.status === 404) {
      console.log('Response Status: 404 - Not Found');
      return { success: false, message: 'Not Found' };
    }
  } catch (error) {
    // Handle errors, including network errors or unexpected statuses
    if (error.response) {
      console.error('Error Response:', error.response);
      if (error.response.status === 404) {
        return { success: false, message: 'Not Found' };
      }
    } else {
      console.error('Network or unknown error:', error);
    }
    throw error; // Re-throw the error if needed
  }
};

