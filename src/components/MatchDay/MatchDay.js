import React, { Fragment } from 'react';

import classes from './MatchDay.module.css';
import Match from './Match/Match';
import shortenClubName from '../../imports/shortenClubName';
import badges from '../../imports/badges';

const matchDay = props => {
    const formatDate = initialDate => {
        return [initialDate.slice(8, 10), initialDate.slice(5, 7)].join("/");   
    }

    const latestMatches = props.games.map(cur => {
        return <Match
                    key={cur.id}
                    matchDate={formatDate(cur.utcDate)}
                    matchDay={cur.matchday}
                    homeBadge={badges[shortenClubName(cur.homeTeam.name)]}
                    homeTeam={shortenClubName(cur.homeTeam.name)}
                    homeTeamScore={cur.score.fullTime.homeTeam}
                    awayBadge={badges[shortenClubName(cur.awayTeam.name)]}
                    awayTeam={shortenClubName(cur.awayTeam.name)}
                    awayTeamScore={cur.score.fullTime.awayTeam}
                    status={cur.status}
                    matchTime={cur.utcDate}
                    winningTeam={cur.score.winner} 
                />;
    });

    
    
    return (
        <Fragment>
            <p>Matchday {props.matchDay}</p>
            <ul className={classes.ListContainer}>
                {latestMatches}
            </ul>
        </Fragment>
    );      
};

export default matchDay;