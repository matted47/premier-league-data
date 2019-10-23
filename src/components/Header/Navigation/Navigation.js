import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.css';

const navigation = props => (
    <nav className={classes.Navigation}>
        <ul>
            <li><NavLink to="/" exact activeClassName={classes.Active}>Table</NavLink></li>
            <li><NavLink to="/fixtures" exact activeClassName={classes.Active}>Fixtures</NavLink></li>
        </ul>
    </nav>
);

export default navigation;