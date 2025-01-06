import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import MyList from './MyList';


function Main() {
  return (
    <div className='main'>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/myList' element={<MyList />} />
        </Routes> 
    </div>
  );
}

export default Main;