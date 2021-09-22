import React from "react";
import headerLogo from '../../images/logo.png'
import "./Header.css"

const Header = () => {
    return (
        <div className='header'>
            <img src={headerLogo} alt="" />
            <nav>
                <a href="shop">Shop</a>
                <a href="review">Review</a>
                <a href="manage">Inventory Manage</a>
            </nav>
        </div>
    );
};

export default Header;