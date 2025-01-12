import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function MyPageHeader() {

    let location = useLocation()

    return (
        <div>
            <div className="link-container">
                <Link to='/' className={`link ${location.pathname === '/' ? 'active' : ''}`}><h2>Account</h2></Link>
                <Link to='/setting' className={`link ${location.pathname === '/setting' ? 'active' : ''}`}><h2>Log out</h2></Link>
            </div>
        </div>
    );
}

export default MyPageHeader;