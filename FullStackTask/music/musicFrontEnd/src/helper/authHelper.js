import { loginSuccess, logout } from '../actions/authActions';

const authenticateUser = async (username, password) => {
  try {
    // Make an API request to authenticate the user
    const response = await fetch('127.0.0.1:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const user = await response.json();
      // Dispatch the loginSuccess action if authentication is successful
      loginSuccess(user);
      return true;
    } else {
      // Dispatch the logout action if authentication fails
      logout();
      return false;
    }
  } catch (error) {
    console.error('Authentication error:', error);
    // Dispatch the logout action if there's an error
    logout();
    return false;
  }
};

export default authenticateUser;
