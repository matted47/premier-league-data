import React from 'react';

const teamListTable = props => (
    <tr>
        <td>{props.name}</td>
        <td>{props.nationality}</td>
        <td>{props.shirtNo}</td>
    </tr>
);

export default teamListTable;