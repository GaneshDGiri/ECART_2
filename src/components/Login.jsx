import React, { useState, useContext } from 'react';
import { ContextData } from './Context';

const Login = () => {
  const { setCurrentPage, setCurrentUser } = useContext(ContextData);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const validUser = existingUsers.find(
      user => user.email === formData.email && user.password === formData.password
    );

    if (validUser) {
      setCurrentUser(validUser); // Set global user
      setCurrentPage('home');    // Redirect to home
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border-2 border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Login</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center font-semibold">{error}</p>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="border p-2 rounded focus:outline-slate-600"
            onChange={(e) => {
              setFormData({...formData, email: e.target.value});
              setError('');
            }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="border p-2 rounded focus:outline-slate-600"
            onChange={(e) => {
              setFormData({...formData, password: e.target.value});
              setError('');
            }}
          />
          <button type="submit" className="bg-slate-800 text-white py-2 rounded hover:bg-slate-700 font-semibold mt-2">
            Login
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <span 
            className="text-blue-600 cursor-pointer font-semibold" 
            onClick={() => setCurrentPage('signup')}
          >
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;