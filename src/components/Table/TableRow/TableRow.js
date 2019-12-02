import React from 'react';
import { Link } from 'react-router-dom';

const tableRow = props => (
    <tr>
        <td>{props.position}</td>
        <td>
            <Link to={'/teams/' + props.teamID}>
                <div>
                    <img src={props.badge} alt="badge" />
                </div>
                {props.club}
            </Link>
        </td>
        <td>{props.played}</td>
        <td>{props.won}</td>
        <td>{props.drawn}</td>
        <td>{props.lost}</td>
        <td>{props.gFor}</td>
        <td>{props.gAgainst}</td>
        <td>{props.gDifference}</td>
        <td>{props.points}</td>
    </tr>
);

export default tableRow;