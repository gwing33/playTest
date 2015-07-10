'use strict';

import React from 'react';
import TextInput from '../components/TextInput.js';

class Login extends React.Component {
  render() {
    return <div>
      Login Page
      <form>
        <TextInput placeholder="Email" />
        <TextInput placeholder="Password"/>
      </form>
    </div>;
  }
}

module.exports = Login;
