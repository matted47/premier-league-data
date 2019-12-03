import React from 'react';
import logo from '../../assets/images/logo.png';
import classes from './Header.module.css';
import Navigation from './Navigation/Navigation';

const header = props => {
  return (
    <div className={classes.Header}>
      <div className={classes.Banner}>
        <div className={classes.Logo}><img src={logo} alt="logo"/></div>
      </div>
      <Navigation />
    </div>
  );
};

export default header;