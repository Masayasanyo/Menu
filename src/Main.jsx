import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Home from './Home';
import MyList from './MyList';
import Setting from './Setting';


function Main({ isLoggedIn, handleLogin, handleLogout, user }) {
  return (
    <div className='main'>
        <Routes>
            <Route 
              path='/' 
              element={
                isLoggedIn ? (
                  <Home user={ user } />
                ) : (
                  <Navigate to="/setting/login" replace />
                )
              }
            />
            <Route 
              path='/myList' 
                element={
                  isLoggedIn ? (
                    <MyList user={ user }/>
                  ) : (
                    <Navigate to="/setting/login" replace />
                  )
                } 
            />
            <Route path='/setting/*' element={<Setting isLoggedIn={ isLoggedIn } handleLogin={ handleLogin } handleLogout={ handleLogout } user={ user }/>} />
        </Routes> 
    </div>
  );
}

export default Main;