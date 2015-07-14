'use strict';
import React from 'react';
import plunge from '../utils/plunge';
import StyleSheet from 'react-style';
import LayoutStyle from '../styles/layout.style.js';

import Button from '../components/form/Button.js';

var styles = StyleSheet.create({
  container: {
    marginTop: '100px'
  },

  number: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '30px',
    margin: '30px 0'
  }
});

class Index extends React.Component {
  _onClick(e) {
    e.preventDefault();
    this.props.ApiData.store.add({
      clicks: this.props.ApiData.data.clicks + 1
    });
  }

  render() {
    console.log('render', this.props);
    return (
      <div styles={[ LayoutStyle.center, LayoutStyle.half, styles.container ]}>
        <Button onClick={this._onClick.bind(this)} value="Click Me"/>
        <div styles={styles.number}>
          {this.props.ApiData.data.clicks}
        </div>
      </div>
    );
  }
}

let ApiData = {
  name: 'ApiData',
  uri: '/api/data',
  data: {
    clicks: 0
  }
};

export default plunge(Index, [ApiData]);
