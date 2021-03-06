import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './pages/home/Home';
import Watch from './pages/watch/Watch';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Settings from './pages/settings/Settings';
import { useAuthContext } from './auth/authContext';
import './app.scss';

function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/register" />}
          </Route>
          <Route path="/register">
            {!user ? <Register /> : <Redirect to="/" />}
          </Route>
          <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
          {user && (
            <>
              <Route exact path="/movies">
                <Home type="movie" />
              </Route>
              <Route exact path="/series">
                <Home type="series" />
              </Route>
              <Route path="/watch">
                <Watch />
              </Route>
              <Route path="/profile">
                <Settings />
              </Route>
            </>
          )}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
