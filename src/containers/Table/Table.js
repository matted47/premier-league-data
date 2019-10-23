import React, { Component, Fragment } from 'react';

import classes from './Table.module.css';
import TableRow from './TableRow/TableRow';
import axios from '../../instances/axios';
import badges from '../../imports/badges';
import shortenClubName from '../../imports/shortenClubName';
import Loader from '../../components/UI/Loader/Loader';
import Error from '../../components/UI/Error/Error';

class Table extends Component {
    state = {
        tableData: [],
        error: false
    }

    componentDidMount() {
        axios.get('competitions/2021/standings').then(response => {
            ////// FILTER DATA \\\\\\
            const data = response.data.standings[0].table;
            data.forEach((cur,ind) => {
                cur.club = shortenClubName(cur.team.name);
                cur.badge = badges[cur.club];
                cur.teamID = cur.team.id;
                delete cur.team;
            });
            this.setState({tableData: data});
        }).catch(error => {
            this.setState({error: true});
        });
    }

    render() {
        const tableRows = this.state.tableData.map((cur, ind) => {
            return <TableRow
                key={ind}
                position={cur.position}
                badge={cur.badge}
                club={cur.club}
                teamID={cur.teamID}
                played={cur.playedGames}
                won={cur.won}
                drawn={cur.draw}
                lost={cur.lost}
                gFor={cur.goalsFor}
                gAgainst={cur.goalsAgainst}
                gDifference={cur.goalDifference}
                points={cur.points}
            />;
        });

        let table = <Loader />;
        if (this.state.error) {
            table = <Error />
        } else if  (this.state.tableData.length > 1) {
            table = <div>
                        <p>Click any team to see up to date stats</p>
                        <div className={classes.Wrapper}>
                            <table className={classes.Table}>
                                <thead>
                                    <tr>
                                        <th>Pos</th>
                                        <th>Club</th>
                                        <th>GP</th>
                                        <th>W</th>
                                        <th>D</th>
                                        <th>L</th>
                                        <th>GF</th>
                                        <th>GA</th>
                                        <th>GD</th>
                                        <th>Pts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableRows}
                                </tbody>
                            </table>
                        </div>
                    </div>;
        }

        return (
            <Fragment>
                {table}
            </Fragment>
        );
    }
}

export default Table;