import React from 'react';

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div>©{currentYear} Masaya Nishimura</div>
        </footer>
    );
}

export default Footer;