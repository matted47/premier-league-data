import React, { Fragment } from 'react';

import classes from './Match.module.css';

const match = props => {

    let gameDate = null;
    if (props.status === 'SCHEDULED') {
        gameDate = <div className={classes.ScheduledDate}>{props.matchTime.slice(11, 16)}</div>;
    } else if (props.status === 'LIVE' || props.status === 'IN_PLAY' || props.status === 'PAUSED') {
        gameDate = <div className={classes.Live}>Live</div>
    }

    let title = props.title ? <h3 className={classes.Title}>{props.title}</h3> : null;

    return (
        <Fragment>
            {title}
            <li className={classes.Match}>
                <div className={classes.Date}>{props.matchDate}</div>
                <div className={
                    props.winningTeam === 'HOME_TEAM' ? [classes.Result, classes.Winner].join(" ") : classes.Result
                }>
                    <div className={classes.TeamName}>
                        <div className={classes.Badge}><img src={props.homeBadge} alt="badge" /></div>
                        {props.homeTeam}
                    </div>
                    <div>{props.homeTeamScore}</div>
                </div>
                <div className={
                    props.winningTeam === 'AWAY_TEAM' ? [classes.Result, classes.Winner].join(" ") : classes.Result
                }>
                    <div className={classes.TeamName}>
                        <div className={classes.Badge}><img src={props.awayBadge} alt="badge" /></div>
                        {props.awayTeam}
                    </div>
                    <div>{props.awayTeamScore}</div>
                </div>
                {gameDate}
            </li>
        </Fragment>
    );
};

export default match;