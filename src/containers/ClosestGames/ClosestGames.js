import React, { Component, Fragment } from 'react';

import { rootData } from '../../instances/axios';
import Match from '../../components/MatchDay/Match/Match';
import badges from '../../imports/badges';
import shortenClubName from '../../imports/shortenClubName';
import Error from '../../components/UI/Error/Error';
import classes from './ClosestGames.module.css';
import Loader from '../../components/UI/Loader/Loader';

class ClosestGames extends Component {
    state = {
        games: [],
        error: false
    }

    componentDidMount() {
        let games = [];
        rootData.get(`teams/${this.props.team}/matches/?status=FINISHED`)
            .then(response => {
                games.push(response.data.matches.slice(-1)[0]);
                
                rootData.get(`teams/${this.props.team}/matches/?status=SCHEDULED&limit=3`)
                    .then(response => {
                        response.data.matches.forEach(cur => {
                            if (cur.competition.name === 'Premier League' && games.length === 1) {
                                games.push(cur);
                            }
                        });
                        this.setState({games: games});
                    }).catch(err => {
                        this.setState({error: true});
                    });
            }).catch(err => {
                this.setState({error: true});
            });
    }

    formatDate(initialDate) {
        return [initialDate.slice(8, 10), initialDate.slice(5, 7)].join("/");   
    }

    render() {
        let closestGames = <Fragment><h3>Last Game</h3><Loader /></Fragment>;
        if (this.state.error) {
            closestGames = <Error />;
        } else if (this.state.games.length === 2) {
            closestGames = this.state.games.map((cur, ind) => {
                let title = ind === 0 ? 'Last Game' : 'Next Game';
                return <Match
                            key={cur.id}
                            matchDate={this.formatDate(cur.utcDate)}
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
                            title={title}
                        />;
            });
        }

        return (
            <ul className={classes.List}>
                {closestGames}
            </ul>
        );
    }
}

export default ClosestGames;