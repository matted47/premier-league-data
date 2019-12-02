import React, { Component, Fragment } from 'react';

import classes from './Fixtures.module.css'
import { rootData } from '../../instances/axios';
import MatchDay from '../../components/MatchDay/MatchDay';
import Loader from '../../components/UI/Loader/Loader'
import Error from '../../components/UI/Error/Error';



class Fixtures extends Component {
    state = {
        currentMatchDay: '',
        oldestMatchDayFetched: null,
        newestMatchDayFetched: null,
        latestMatches: [],
        prevMatchDays: [],
        nextMatchDays: [],
        loading: true,
        prevLoading: false,
        nextLoading: false,
        error: false
    }

    componentDidMount() {
        rootData.get('competitions/2021/matches/?status=FINISHED')
            .then(response => {
                const currentMatchDay = response.data.matches.reverse()[0].matchday;      // FIND CURRENT MATCHDAY
            
                rootData.get(`competitions/2021/matches/?matchday=${currentMatchDay}`)                   // GET GAMES FROM CURRENT MATCHDAY  
                    .then(response => {
                        this.setState({latestMatches: [...response.data.matches], currentMatchDay: currentMatchDay, loading: false});
                    }).catch(error => {
                        this.setState({error: true});
                    });
            }).catch(error => {
                this.setState({error: true});
            });;
    }

    loadPastGamesHandler() {
        this.setState({prevLoading: true});
        
        let prevMatchDay;
        if (!this.state.oldestMatchDayFetched) {
            prevMatchDay = this.state.currentMatchDay - 1;
        } else {
            prevMatchDay = this.state.oldestMatchDayFetched - 1;
        }

        rootData.get(`competitions/2021/matches/?matchday=${prevMatchDay}`)
            .then(response => {
                const prevMatchDays = this.state.prevMatchDays;
                prevMatchDays.unshift(response.data.matches);
                this.setState({prevMatchDays: prevMatchDays, oldestMatchDayFetched: prevMatchDay, prevLoading: false});
            }).catch(err => {
                this.setState({error: true});
            });
    }

    loadNextGamesHandler() {
        this.setState({nextLoading: true});
        let nextMatchDay;
        if (!this.state.newestMatchDayFetched) {
            nextMatchDay = this.state.currentMatchDay + 1;
        } else {
            nextMatchDay = this.state.newestMatchDayFetched + 1;
        }

        rootData.get(`competitions/2021/matches/?matchday=${nextMatchDay}`)
            .then(response => {
                const nextMatchDays = this.state.nextMatchDays;
                nextMatchDays.unshift(response.data.matches);
                this.setState({nextMatchDays: nextMatchDays, newestMatchDayFetched: nextMatchDay, nextLoading: false});
            }).catch(err => {
                this.setState({error: true});
            });
    }

    render() {
        // CURRENT GAMES \\
        let currentMatchDay;
        if (this.state.loading) {
            currentMatchDay = <Loader />;
        } else {
            currentMatchDay = <MatchDay matchDay={this.state.currentMatchDay} games={this.state.latestMatches} />;
        }
        
        // PREV GAMES \\
        let pastGames = null;
        if (this.state.prevMatchDays.length > 0 || this.state.prevLoading) {
            if (this.state.prevLoading) {
                pastGames = <Loader />;
            } else {
                pastGames = this.state.prevMatchDays.map((cur, ind) => {
                    return <MatchDay matchDay={cur[0].matchday} games={cur} key={ind}/>
                });
            }
        }

        // NEXT GAMES \\
        let nextGames = null;
        if (this.state.nextMatchDays.length > 0 || this.state.nextLoading) {
            if (this.state.nextLoading) {
                nextGames = <Loader />;
            } else {
                nextGames = this.state.nextMatchDays.map((cur, ind) => {
                    return <MatchDay matchDay={cur[0].matchday} games={cur} key={ind}/>
                });
            }
        }

        // Hide past & next game buttons if at the start or end of season respectively
        const pastGameStyle = this.state.oldestMatchDayFetched === 1 ? 'Hide' : null;
        const nextGameStyle = this.state.newestMatchDayFetched === 38 ? 'Hide' : null;
        

        return (
            <Fragment>
                {this.state.error ? <Error /> : null}
                <button onClick={this.loadPastGamesHandler.bind(this)} className={`${classes.Btn} ${pastGameStyle}`}>Past Games</button>
                {pastGames}
                <h1 className={classes.Heading}>Latest Results</h1>
                {currentMatchDay}
                {nextGames}
                <button onClick={this.loadNextGamesHandler.bind(this)} className={`${classes.Btn} ${nextGameStyle}`}>Next Games</button>
                
            </Fragment>
        );
    }
}

export default Fixtures;