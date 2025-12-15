import { AppContext } from './AppContext';
import { Switch, Route } from "react-router-dom";
import React, { useContext } from 'react';
import Login from "./pages/Login/Login";
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import './scss/app.scss'

function App() {
  const { isLoggedIn, theme } = useContext(AppContext)

  return (
    <Switch>
      <Route exact path="/">
        <div className={`page__wrapper${theme ? '--dark' : ''}`}>
          <div className={`page__row${theme ? '--dark' : ''}`} style={{ marginLeft: isLoggedIn ? '' : 0 }}>
            <Home />
          </div>
        </div>
      </Route>

      <Route exact path="/login">
        <div className={`page__wrapper${theme ? '--dark' : ''}`}>
          <Header />
          <Login />
        </div>
      </Route>

      {/* FALLBACK PAGE -> RENDER HOME*/}
      <Route>
        <div className={`page__wrapper${theme ? '--dark' : ''}`}>
          <Header />
          <div className={`page__row${theme ? '--dark' : ''}`} style={{ marginLeft: isLoggedIn ? '' : 0 }}>
            <Home />
          </div>
        </div>
      </Route>
    </Switch>
  )
}

export default React.memo(App)
