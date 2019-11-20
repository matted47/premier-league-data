import React from 'react';

import classes from './LoaderWelcome.module.css';
import logo from '../../../assets/images/logo-welcome.png';

const loaderWelcome = () => (
    <div className={classes.LoaderWelcome}>
        <div className={classes.Logo}>
            <img src={logo} alt="Premier League Data" />
        </div>
    </div>
);

export default loaderWelcome;