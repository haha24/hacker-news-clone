import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.styles.css';

const Header = (props) => (
    <div className="header">
        <Link to="/">
            <span className="header-logo">Y</span>
        </Link>
        <div className="header-options">
            <Link>SIGN IN</Link>
        </div>
    </div>
);

export default Header;
