import React from 'react';

import TeamListTable from './TeamListTable/TeamListTable';
import classes from './TeamList.module.css'

const teamList = props => {
    const squad = {
        Goalkeeper: [],
        Defender: [],
        Midfielder: [],
        Attacker: []
    };

    props.players.forEach(cur => {
        if (typeof cur.position === 'string') {
            const position = cur.position;
            squad[position].push(cur);

        }
        
    });

    let table = [];
    for (let key in squad) {
        table.push(<tr key={key} className={classes.Heading}><td colSpan="3">{key}s</td></tr>);
        const data = squad[key].map(cur => {
            return <TeamListTable 
                    key={cur.id}
                    name={cur.name} 
                    nationality={cur.nationality} 
                    shirtNo={cur.shirtNumber}
                   />;
        });
        table.push(data);
    }

    return (
        <div className={classes.Squad}>
            <h3>Squad</h3>
            <div className={classes.TableWrapper}>
                <table className={classes.Table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Nationality</th>
                            <th>Shirt No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default teamList;