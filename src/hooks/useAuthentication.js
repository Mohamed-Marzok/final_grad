import { useState } from 'react';
import { login_API, register_API } from '../utils/constants';

const useAuth = () => {
  const [error, setError] = useState(null);

  const login = async (loginData) => {
    try {
      const response = await fetch(login_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Login successful
      // You can return any data you need here
      return await response.json();
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  const register = async (registerData) => {
    try {
      const response = await fetch(register_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Registration successful
      // You can return any data you need here
      return await response.json();
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  return { login, register, error };
};

export default useAuth;
