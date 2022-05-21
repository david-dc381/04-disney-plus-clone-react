import React from 'react';
import { Counter } from './features/counter/Counter';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';
import Detail from './components/Detail';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/detail/:id">
            <Detail />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
