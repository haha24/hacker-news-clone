import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './pages/homepage';
import StoriesPage from './pages/storiespage';
import Header from './components/header';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/new" component={StoriesPage} />
        <Route path="/top" component={StoriesPage} />
        <Route path="/best" component={StoriesPage} />
      </Switch>
    </div>
  );
}

export default App;
