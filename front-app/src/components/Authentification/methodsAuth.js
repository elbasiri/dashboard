import axios from 'axios';

// Method for user registration
const register = async (name, email, password) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/register', {
      name: name,
      email: email,
      password: password
    });

    // Handle the response, e.g., show a success message
    console.log('Registration successful',response);
  } catch (error) {
    // Handle the error, e.g., display an error message
    console.error('Registration failed', error);
  }
};

// Method for user login
const login = async (email, password) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
      email: email,
      password: password
    });

    // Handle the response, e.g., store the token in local storage
    localStorage.setItem('token', response.data.token);
    console.log('Login successful');
  } catch (error) {
    // Handle the error, e.g., display an error message
    console.error('Login failed', error);
  }
};

export { register, login };
