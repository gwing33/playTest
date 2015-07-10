'use strict';

import React from 'react';
import TextInput from '../components/form/TextInput.js';
import LayoutStyle from '../styles/layout.style.js';

var styles = {
  container: {
    width: '231px',
    position: 'fixed',
    left: '50%',
    top: '50%',
    marginLeft: '-115px',
    marginTop: '-260px',
    textAlign: 'center'
  },
  title: {
    color: '#fff',
    marginBottom: '20px'
  },
  h1: {
    fontSize: '24px'
  },
  h2: {
    fontSize: '16px'
  }
};

class Login extends React.Component {
  render() {

    return <div style={ LayoutStyle.center, styles.container }>
      <h1 styles={[styles.title, styles.h1]}>Play Test</h1>
      <form>
        <h2 styles={[styles.title, styles.h2]}>Enter your Credentials to Login</h2>
        <TextInput placeholder='Email' />
        <TextInput placeholder='Password' type='password'/>
      </form>
    </div>;
  }
}

module.exports = Login;
