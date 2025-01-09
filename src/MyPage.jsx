import React from 'react';

function MyPage({ handleLogout, user }) {
    return (
        <div className='mypage-container'>
            <div className='personal-container'>
                <h1 className='username'>
                    <span>{user.username}</span>
                </h1>
            </div>
            <div className='profile-button'>
                <button className='profile-edit-button'>Edit</button>
                <button className='logout-button' onClick={handleLogout} >Log out</button>
            </div>
        </div>
    );
}
  
export default MyPage;