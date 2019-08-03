import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.css';

const Header = (props) => (
    <div className="header">
        <Link to="/">
            <span className="header-logo">Y</span>
        </Link>
        
        <div className="header-options">
            <Link className="header-option" to="/new">NEW</Link>
            <Link className="header-option" to="/top">TOP</Link>
            <Link className="header-option" to="/best">BEST</Link>
            <Link className="header-option" to="/job">JOB</Link>
            <Link className="header-option" to="/show">SHOW</Link>
            <Link className="header-option" to="/ask">ASK</Link>
        </div>
    </div>
);

export default Header;
