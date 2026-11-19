import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Attendee'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Future API connection block
    console.log("Submitting to API:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-24">
      <div className="max-w-lg w-full bg-surface rounded-2xl shadow-xl border border-border p-8">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-textMain">Create an Account</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-textMain mb-2">Full Name</label>
            <input 
              type="text" 
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-textMain" 
              placeholder="John Doe" 
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-textMain mb-2">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-textMain" 
              placeholder="you@example.com" 
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-textMain mb-2">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              required
              minLength="8"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-textMain" 
              placeholder="••••••••" 
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-textMain mb-2">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-textMain" 
              placeholder="••••••••" 
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-textMain mb-2">I am joining as a...</label>
            <select 
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary text-textMain cursor-pointer">
              <option value="Attendee">Visitor / Attendee</option>
              <option value="Exhibitor">Exhibitor (Book a Booth)</option>
              {/* Admin role is strictly removed from public registration */}
            </select>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 rounded-lg transition-all shadow-lg mt-4"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;