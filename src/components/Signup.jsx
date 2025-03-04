import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();//otherwise get network error. prevent form from submitting and refreshing
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log('signup successful', user);
      onLogin(user, username);
    } catch (error) {
      console.error('signup error', error.message);
      alert('signup failed' + error.message);
    }
  };

  return (
    <div className='signup-form-container'>
      <p className='signup-message'>Create an account to save data and access from anywhere!</p>
      <form className='signup-form' onSubmit={handleSignup}>
        <p className='signup-name'>Signup</p>
        <input
          className='input-field'
          type='text'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete='username'
        />
        <input
          className='input-field'
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete='email'
        />
        <input
          className='input-field'
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete='new-password'
        />
        <button type='submit' className='signup-button'>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
