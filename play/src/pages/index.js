'use strict';

import React from 'react';
import plunge from '../utils/plunge';

class Index extends React.Component {
  _onClick() {
    let clicks = this.props.ApiData.data.clicks || 0;
    this.props.ApiData.store.add({ clicks: clicks + 1 });
  }

  render() {
    console.log('render', this.props);
    return (
      <div className='container'>
        Hello World!!
        <a onClick={this._onClick.bind(this)}>Click Me!</a>
        {this.props.ApiData.data.clicks}
      </div>
    );
  }
}

let ApiData = {
  name: 'ApiData',
  uri: '/api/data',
  data: {
    isData: true
  }
};

export default plunge(Index, [ApiData]);
