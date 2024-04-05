import React, { useState } from 'react';
import { signUp } from '../../firebase/firebaseAuth';

const SignUpComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    setError(''); // Reset error message
    
    try {
      await signUp(email, password);
      console.log('User created successfully');
      // Here, you might want to redirect the user to the login page or to the homepage
    } catch (error) {
      console.error('Error during sign up:', error.message);
      setError(error.message); // Set error message to display to the user
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpComponent;
