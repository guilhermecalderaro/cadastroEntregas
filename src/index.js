import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ListDelivery from './pages/ListDelivery';
import MapDelivery from './pages/MapDelivery';

import './assets/styles/global.css';

import * as serviceWorker from './serviceWorker';

const Pagina404 = () => (
  <main>
    <h1>Página 404</h1>
  </main>
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ListDelivery} />
        <Route path="/delivery/map/:id" component={MapDelivery} />
        <Route component={Pagina404} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
