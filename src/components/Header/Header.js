import React from "react";
import { Link } from "react-router-dom";
import headerLogo from '../../images/logo.png'
import "./Header.css"

const Header = () => {
    return (
        <div className='header'>
            <img src={headerLogo} alt="" />
            <nav>
                <Link to='/shop'>Shop</Link>
                <Link to='/review'>Review</Link>
                <Link to='/inventory'>Inventory Manage</Link>
            </nav>
        </div>
    );
};

export default Header;