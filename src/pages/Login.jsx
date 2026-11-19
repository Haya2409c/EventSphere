import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    // bg-background (#FAFAFC) video theme ke sath match karega
    <div className="min-h-screen flex items-center justify-center bg-background px-4 pt-20">
      
      {/* bg-surface (#FFFFFF) pure white card */}
      <div className="max-w-md w-full bg-surface rounded-2xl shadow-xl border border-border p-8">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-textMain">Welcome Back</h2>
          <p className="text-textSecondary mt-2 font-medium">
            Sign in to Event<span className="text-primary font-bold">Sphere</span>
          </p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-textMain mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-textMain" 
              placeholder="admin@eventsphere.com" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-textMain mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-textMain" 
              placeholder="••••••••" 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="w-4 h-4 text-primary border-border rounded focus:ring-primary cursor-pointer" />
              <span className="ml-2 text-sm text-textSecondary font-medium">Remember me</span>
            </label>
            {/* text-accent (#F5A623) for warm orange highlight */}
            <a href="#" className="text-sm font-semibold text-accent hover:text-primary transition-colors">
              Forgot Password?
            </a>
          </div>
          
          {/* bg-primary (#5145CD) button */}
          <button 
            type="button" 
            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-primary/30"
          >
            Sign In
          </button>
        </form>
        
        <p className="text-center mt-8 text-textSecondary text-sm font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary font-bold hover:text-accent transition-colors">
            Register Now
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;