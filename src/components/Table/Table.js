import React from 'react';

import classes from './Table.module.css';
import TableRow from './TableRow/TableRow';


const table = props => {
  const tableRows = props.tableData.map((cur, ind) => {
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

  return (
    <div>
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

      <div className={classes.Key}>
        <h3>Key</h3>
        <div>
          <div className={classes.Blue}></div>
          <p>Champions League Qualifcation</p>
        </div>
        <div>
          <div className={classes.Orange}></div>
          <p>Europa League Qualifcation</p>
        </div>
        <div>
          <div className={classes.Red}></div>
          <p>Relegation</p>
        </div>
      </div>
    </div>
  );
}


export default table;