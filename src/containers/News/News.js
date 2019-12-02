import React, { Component } from 'react';

import { newsData } from '../../instances/axios'; 
import NewsCard from '../../components/NewsCard/NewsCard';
import Loader from '../../components/UI/Loader/Loader';
import classes from './News.module.css';

class News extends Component {
    state = {
        stories: []
    }

    componentDidMount() {
        newsData.get('search?tag=football%2Fpremierleague&show-fields=thumbnail').then(response => {
            this.setState({stories: response.data.response.results});
        });
    }

    render() {
        let news = <Loader />

        // Once AJAX call is complete
        if (this.state.stories.length) {
            news = this.state.stories.map((cur, ind) => {
                // Split headline & author if present
                let title, author;
                if (cur.webTitle.includes('|')) {
                    const ind = cur.webTitle.indexOf('|');
                    author = cur.webTitle.substring(ind);
                    title = cur.webTitle.substring(0, ind);
                } else {
                    title = cur.webTitle;
                }

                return <NewsCard 
                        img={cur.fields.thumbnail}
                        title={title}
                        author={author}
                        fullArticleLink={cur.apiUrl}
                        key={cur.id}
                       />;
            });
        }

        return (
                <div className={classes.NewsContainer}>
                    {news}
                </div>
            );
    }
}

export default News;