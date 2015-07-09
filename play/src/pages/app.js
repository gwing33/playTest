import React from 'react';
import { RouteHandler, Link } from 'react-router';

class App extends React.Component {
  render() {
    return <div>
      <nav>
        <Link to="home">Home</Link>
        <Link to="login">Login</Link>
      </nav>
      <RouteHandler />
    </div>;
  }
}

module.exports = App;
