import React from 'react';
import classes from './Error.module.css';

const error = props => (
    <div className={classes.Error}>
        <p>An error occured. Please refresh the page</p>
    </div>
);

export default error;