import React, { useState, useContext } from 'react';
import { ContextData } from './Context';

const Signup = () => {
  const { setCurrentPage } = useContext(ContextData);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    // Get existing users or empty array
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if email exists
    if (existingUsers.find(user => user.email === formData.email)) {
      setError("User already exists with this email.");
      return;
    }

    // Save new user
    const newUser = { ...formData };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
    
    alert("Signup Successful! Please Login.");
    setCurrentPage('login');
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 border-2 border-slate-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Sign Up</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center font-semibold">{error}</p>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="border p-2 rounded focus:outline-slate-600"
            onChange={(e) => {
              setFormData({...formData, name: e.target.value});
              setError('');
            }}
          />
          <input 
            type="email" 
            placeholder="Email Address" 
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
            Create Account
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span 
            className="text-blue-600 cursor-pointer font-semibold" 
            onClick={() => setCurrentPage('login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;