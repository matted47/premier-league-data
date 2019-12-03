import React, { Component, Fragment } from 'react';

import { rootData } from '../../instances/axios';
import badges from '../../imports/badges';
import shortenClubName from '../../imports/shortenClubName';
import TeamList from '../../components/TeamList/TeamList'
import Loader from '../../components/UI/Loader/Loader';
import classes from './Team.module.css';
import ClosestGames from '../ClosestGames/ClosestGames';
import Error from '../../components/UI/Error/Error';

class Team extends Component {
  state = {
    loaded: false,
    error: false
  }

  componentDidMount() {
    rootData.get(`teams/${this.props.match.params.team}`)
      .then(response => {
        let manager;
        response.data.squad.forEach(cur => {
          if (cur.role === 'COACH') {
            manager = cur.name;
          }
        });
        const badge = shortenClubName(response.data.name);
          this.setState({
            ...response.data,
            manager: manager,
            badge: badge,
            loaded: true
          });
      }).catch(err => {
        this.setState({error: true});
      });
  }

  render() {
    // HEADING \\
    let heading = <Loader />;
    if (this.state.error) {
      heading = <Error />;
    } else if (this.state.hasOwnProperty('id')) {
      heading = (
        <div className={classes.HeadingWrapper}>
          <div className={classes.Heading}>
            <div className={classes.Image}><img src={badges[this.state.badge]} alt="Club Badge" /></div>
            <h2>{this.state.name}</h2>
          </div>
          <div className={classes.Brief}>
            <div><strong>Manager:</strong> {this.state.manager}</div>
            <div><strong>Ground:</strong> {this.state.venue}</div>
          </div>
        </div>);
    }

    // NEXT/LAST GAME
    let closestGames = null;
    if (this.state.loaded) {
      closestGames = <ClosestGames team={this.props.match.params.team} />;
    }

    // TEAM LIST \\
    let teamList = null;
    if (this.state.hasOwnProperty('id')) {
      teamList = <TeamList players={this.state.squad} />;
    }
  
    return (
      <Fragment>
        <button
          className={classes.BackBtn} 
          onClick={() => this.props.history.goBack()}
        >
          &larr; Back to Table
        </button>
        <div className={classes.Team}>
          {heading}
          {closestGames}
          {teamList}
        </div>
      </Fragment>
    );
  }
}

export default Team;