import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './header.styles.css';

const Header = (props) => (
    <div className="header">
        <Link to="/">
            <span className="header-logo">Y</span>
        </Link>
        
        <div className="header-options">
            <NavLink className="header-option" to="/new" activeClassName="header_active">NEW</NavLink>
            <NavLink className="header-option" to="/top" activeClassName="header_active">TOP</NavLink>
            <NavLink className="header-option" to="/best" activeClassName="header_active">BEST</NavLink>
            <NavLink className="header-option" to="/job" activeClassName="header_active">JOB</NavLink>
            <NavLink className="header-option" to="/show" activeClassName="header_active">SHOW</NavLink>
            <NavLink className="header-option" to="/ask" activeClassName="header_active">ASK</NavLink>
        </div>
    </div>
);

export default Header;
