import React, { Component, Fragment } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import { rootData } from './instances/axios';
import Layout from './containers/Layout/Layout';
import Table from './containers/Table/Table';
import Loader from './components/UI/Loader/Loader';
import Fixtures from './containers/Fixtures/Fixtures';
import badges from './imports/badges';
import shortenClubName from './imports/shortenClubName';
import Team from './containers/Team/Team';
import Error from './components/UI/Error/Error';
import LoaderWelcome from './components/UI/LoaderWelcome/LoaderWelcome';
import News from './containers/News/News';
import NewsArticle from './containers/NewsArticle/NewsArticle';

class App extends Component {
  state = {
    tableData: [],
    error: false
  }
  componentDidMount() {
    ////// GET TABLE DATA ON INITIAL APP LOAD \\\\\\
    rootData.get('competitions/2021/standings').then(response => {
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
    let display = <Loader/>;

    if (this.state.error) {
      display = <Error />;
    } else if (this.state.tableData.length) {
      display = (
          <Layout>
            <Switch>
              <Route path="/" exact render={(props) => <Table {...this.state} />} />
              <Route path="/fixtures" exact component={Fixtures} />
              <Route path="/news" exact component={News} />
              <Route path="/news/:article" component={NewsArticle} />
              <Route path="/teams/:team" component={Team} />
              <Route render={() => <p>Page not found.<br/>Please use the links above.</p>}/>
            </Switch>
          </Layout>
      );
    }

    return (
      <Fragment>
        <LoaderWelcome/>
        <HashRouter basename="/premier-league-data">
          
          {display}
        </HashRouter>
      </Fragment>
    );
  }
}

export default App;
