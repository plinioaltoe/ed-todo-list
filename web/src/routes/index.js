import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import Main from '../pages/main';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import history from './history';

import { isAuthenticated } from '../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

PrivateRoute.defaultProps = {
  component: () => {},
  location: {},
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
};

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/main" component={Main} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
