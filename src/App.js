import React from 'react';
import { Route, Switch } from 'react-router-dom';

import StoriesPage from './pages/storiespage';
import CommentsPage from './pages/commentspage';
import Header from './components/header';

import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={StoriesPage}/>
        <Route path="/new" component={StoriesPage} />
        <Route path="/top" component={StoriesPage} />
        <Route path="/best" component={StoriesPage} />
        <Route path="/item" component={CommentsPage} />
      </Switch>
    </div>
  );
}

export default App;
