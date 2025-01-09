import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('user');

    if (storedIsLoggedIn === 'true' && storedUser) {
      try {
          const parsedUser = JSON.parse(storedUser);
          setIsLoggedIn(true);
          setUser(parsedUser);
      } catch (error) {
          console.error("Failed to parse user data:", error);
          localStorage.removeItem('user');
      }
    }
    else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; 
  }

  const handleLogin = (userData) => { 
    setIsLoggedIn(true); 
    setUser(userData); 
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  }
  
  const handleLogout = () => { 
    setIsLoggedIn(false); 
    setUser(null); 
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  }

  return (
    <Router>
      <div className="app">
        <Header/>
        <Main isLoggedIn={ isLoggedIn } handleLogin={ handleLogin } handleLogout={ handleLogout } user={ user }/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
