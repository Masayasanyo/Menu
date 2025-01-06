import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
