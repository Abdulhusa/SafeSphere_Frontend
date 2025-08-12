import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './assets/pages/Home'
import Dashboard from './assets/pages/Dashboard';
import Login from './assets/pages/Login';
import Register from './assets/pages/Register';
import SafeRoute from './assets/pages/SafeRoute';
import Emergency from './assets/pages/Emergency';
import Report from './assets/pages/Report';
import SafeBot from './assets/pages/SafeBot';
import Profile from './assets/pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/safe-route" element={<SafeRoute />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/report" element={<Report />} />
            <Route path="/safebot" element={<SafeBot />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
