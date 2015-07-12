'use strict';

import React from 'react';

let styles = {
  label: {
    color: '#fff',
    display: 'block',
    textAlign: 'left',
    fontSize: '11px'
  },
  checkbox: {
    marginRight: '15px'
  }
};

class SingleCheckbox extends React.Component {
  _onChange(e) {
    if(typeof this.props.onChange === 'function') {
      this.props.onChange(e);
    }
  }

  render() {
    return <label styles={styles.label}>
      <input styles={styles.checkbox} onChange={this._onChange} type='checkbox' />
      {this.props.text}
    </label>;
  }
}

let PropTypes = React.PropTypes;
SingleCheckbox.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func
};

export default SingleCheckbox;
