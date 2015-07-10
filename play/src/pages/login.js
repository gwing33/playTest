'use strict';

import React from 'react';
import TextInput from '../components/TextInput.js';
import LayoutStyle from '../styles/layout.style.js';

var styles = {
  container: {
    width: '231px',
    position: 'fixed',
    left: '50%',
    top: '50%',
    marginLeft: '-115px',
    marginTop: '-260px',
    textAlign: 'center',
    color: '#fff'
  },
  h1: {
    fontSize: '24px',
    marginBottom: '20px'
  },
  h2: {
    fontSize: '16px',
    marginBottom: '20px'
  }
};

class Login extends React.Component {
  render() {

    return <div style={ LayoutStyle.center, styles.container }>
      <div>
        <h1 styles={styles.h1}>Play Test</h1>
        <div>
          <h2 styles={styles.h2}>Enter your Credentials to Login</h2>
          <form>
            <TextInput placeholder="Email" />
            <TextInput placeholder="Password"/>
          </form>
        </div>
      </div>

    </div>;
  }
}

module.exports = Login;
