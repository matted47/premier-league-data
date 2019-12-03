import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NewsCard.module.css';

const newsCard = props => {
  // Format URL link for full article
  const urlLink = props.fullArticleLink.substring(33);

  return (
    <Link 
      to={{
        pathname: "/news/" + props.title,
        state: { 
          linkToFetch: urlLink
        }
      }}
      className={classes.Link}
    >
      <div className={classes.Card}>
        <div className={classes.Img}><img src={props.img} alt={props.title} /></div>
        <div className={classes.Info}>
          <div>{props.title}</div>
          {props.author ? <div>{props.author}</div> : null}
        </div>
      </div>
    </Link>
  );
};

export default newsCard;
