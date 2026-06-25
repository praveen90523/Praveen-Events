import React, { useEffect, useState } from 'react';
import Navbar1 from './Navbar/Navbar';
import Home from './Home/Home';
import AboutUs from './About Us/About Us';
import Services from './Services/Services';
import Gallery from './Gallery/Gallery';
import Form from './Form/Form';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Footer from './Footer/Footer';
import GrandWedding from './Services/GrandWedding';
import CorporateConferences from './Services/CorporateConferences';
import BirthdayFunctions from './Services/BirthdayFunctions';
import PrivateParties from './Services/PrivateParties';
import Destinations from './Services/Destinations';
import Festivals from './Services/Festivals';
import Blogs from './Blogs/Blogs';
import Blogs1 from './Blogs/Blogs1';
import Blogs2 from './Blogs/Blogs2';
import Authentication from './Welcomepage/Authentication';
import Imagedetail from './Services/Imagedetail';
import Contact from './Form/Contact';

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation();
  useEffect(() => {
    // Local auth checking from localStorage
    const loggedInUser = localStorage.getItem("loggedInPerson");
    if (loggedInUser) {
      setUser({ name: loggedInUser });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-xl font-bold text-orange-500 animate-pulse">Loading, please wait a moment...</h1>
      </div>
    );
  }
  const hideNavbarPaths = ['/', '/dashboard', '/signup', '/login', '/contact'];
  const isAuthenticated = () => {
    const user = localStorage.getItem("loggedInPerson");
    return !!user;
  };
  
  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar1 />}
      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='/home' element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/services' element={<Services />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blogs1' element={<Blogs1 />} />
        <Route path='/blogs2' element={<Blogs2 />} />
        <Route path='/form' element={<Form />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/dashboard" element={localStorage.getItem("loggedInPersonRole") === "admin" ? <Dashboard /> : <Navigate to="/login" state={{ message: "Admins only" }} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/grand-wedding" element={<GrandWedding />} />
        <Route path="/corporate-conferences" element={<CorporateConferences />} />
        <Route path="/birthday-functions" element={<BirthdayFunctions />} />
        <Route path="/private-parties" element={<PrivateParties />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/festivals" element={<Festivals />} />
        <Route path="/details/:id" element={<Imagedetail />} />
      </Routes>
      {!hideNavbarPaths.includes(location.pathname) && <Footer />}

    </div>

  )
}

export default App
