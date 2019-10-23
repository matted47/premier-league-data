import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './containers/Layout/Layout';
import Table from './containers/Table/Table';
import Fixtures from './containers/Fixtures/Fixtures';
import Team from './containers/Team/Team';

function App() {
  return (
    <HashRouter basename="/premier-league-data">
      <Layout>
        <Switch>
          <Route path="/" exact component={Table} />
          <Route path="/fixtures" exact component={Fixtures} />
          <Route path="/teams/:team" render={(props) => <Team {...props} />} />
          <Route render={() => <p>Page not found.<br/>Please use the links above.</p>}/>
        </Switch>
      </Layout>
    </HashRouter>
  );
}

export default App;
