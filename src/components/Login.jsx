import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log('login successful');
      onLogin(user);
    } catch (error) {
      console.error('login error', error.message);
      alert('login failed: ' + error.message);
    }
  };

  return (
    <div className='login-form-container'>
      <form onSubmit={handleLogin} className='login-form'>
        <p className='login-name'>Login</p>
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
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete='current-password'
        />
        <button type='submit' className='login-button'>Login</button>
      </form>
    </div>
  );
};

export default Login;
