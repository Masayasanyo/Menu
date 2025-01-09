import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {

    let location = useLocation()

    return (
        <header>
            <div>
                <h1>Menu</h1>
            </div>
            <div className="link-container">
                <Link to='/' className={`link ${location.pathname === '/' ? 'active' : ''}`}><h2>Home</h2></Link>
                <Link to='/myList' className={`link ${location.pathname === '/myList' ? 'active' : ''}`}><h2>My List</h2></Link>
                <Link to='/setting' className={`link ${location.pathname === '/setting' ? 'active' : ''}`}><h2>Setting</h2></Link>
            </div>
        </header>
    );
}

export default Header;