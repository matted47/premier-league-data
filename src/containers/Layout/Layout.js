import React, { Component, Fragment } from 'react';
import Header from '../../components/Header/Header';
import classes from './Layout.module.css';

class Layout extends Component {

    render() {
        return (
            <Fragment>
                <Header />
                <main className={classes.Main}>{this.props.children}</main>
            </Fragment>
        );
    }
}

export default Layout;