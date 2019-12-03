import React, { Component, Fragment } from 'react';
import classes from './NewsArticle.module.css';
import { newsData } from '../../instances/axios';
import Loader from '../../components/UI/Loader/Loader';

class NewsArticle extends Component {
  _isMounted = false;

  state = {}

  componentDidMount() {
    this._isMounted = true;

    const { linkToFetch } = this.props.location.state;
      
    newsData.get('search?show-fields=headline,trailText,body,thumbnail&page-size=1&q=' + linkToFetch)
      .then(response => {
        const data = response.data.response.results[0].fields;

        const date = this.formattedDate(response.data.response.results[0].webPublicationDate);

        if(this._isMounted) {
          this.setState({
            headline: data.headline,
            trailText: data.trailText,
            thumbnail: data.thumbnail,
            body: data.body,
            date: date
          });
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  formattedDate(oldDate) {
    // Format date and get timestamp          RESULT - Fri Nov 01 2019 00:00:00 GMT+0000 (Greenwich Mean Time)
    const dateSplit = new Date(oldDate.substring(0, 10));

    // Get date only & split                  RESULT - ["Fri", "Nov", "01", "2019"]
    const dateArr = dateSplit.toDateString().split(' ');

    // Reverse Day & Month, removing the first zero from day if it exists   RESULT - ["Fri", "1", "Nov", "2019"]
    const dateReversed = dateArr.splice(1, 2).reverse();   

    if (dateReversed[0].split('')[0] === '0') {
      dateReversed[0] = dateReversed[0].split('')[1];  // Remove '0' from start if it exists
    }

    dateReversed.unshift(dateArr[0]);
    dateReversed.push(dateArr[1]);
    
    // Join & return                           RESULT 'Fri 01 Nov 2019'
    const newDate = dateReversed.join(' ');
    return newDate;
  }
   
  render() {
    let content = <Loader />;

    if (this.state.body) {
      content = (
        <div className={classes.Article}>
          <div className={classes.Headline}>{this.state.headline}</div>
          <div className={classes.Date}>{this.state.date}</div>
          <img className={classes.Thumbnail} src={this.state.thumbnail} alt={this.state.trailText} />
          <div className={classes.TrailText}>{this.state.trailText}</div>
          <div className={classes.Body} dangerouslySetInnerHTML={{ __html: this.state.body }} />
        </div>
      );
    }

    return (
      <Fragment>
        <button
        className={classes.BackBtn} 
        onClick={() => this.props.history.goBack()}>
          &larr; Back to News
        </button>
        {content}
      </Fragment>
    );
  }
};

export default NewsArticle;