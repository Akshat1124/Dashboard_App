import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import type { User } from '../types';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }
    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }
    return isValid;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      // Mock user login with static Indian user data, personalized to the user's example.
      const user: User = {
        id: 11,
        name: 'Akshat Srivastava',
        username: 'akshat.srivastava',
        email: email,
        address: { street: 'Lajpat Nagar', suite: 'B-Block', city: 'New Delhi', zipcode: '110024', geo: { lat: '28.5673', lng: '77.2496' } },
        phone: '+91 98765 54321',
        website: 'akshatsrivastava.dev',
        company: { name: 'Innovate Delhi', catchPhrase: 'Creative digital solutions', bs: 'web and mobile development' }
      };

      login(user);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    }
  };
  
  const errorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 bg-cover bg-center" style={{ backgroundImage: `url('https://picsum.photos/1600/900')`}}>
      <div className="absolute inset-0 bg-black/50"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl z-10"
      >
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">Sign in to AuraDash</h2>
          <p className="mt-2 text-sm text-gray-300">
            Or{' '}
            <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-400 text-center">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-500 bg-black/20 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-t-md" 
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <motion.p variants={errorVariants} initial="hidden" animate="visible" className="text-red-400 text-xs mt-1 px-1">{emailError}</motion.p>}
            </div>
            <div>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-500 bg-black/20 text-white placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-b-md" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <motion.p variants={errorVariants} initial="hidden" animate="visible" className="text-red-400 text-xs mt-1 px-1">{passwordError}</motion.p>}
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;