require('../less/components/TextInput.less');
import React from 'react';

class TextInput extends React.Component {
  _onChange(e) {
    if(typeof this.props.onChange === 'function') {
      this.props.onChange(e);
    }
  }

  render() {
    return <input type={this.props.type || 'text'}
                  placeholder={this.props.placeholder || ""}
                  value={this.props.value}
                  onChange={this._onChange} />;
  }
}

let PropTypes = React.PropTypes;

TextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string
};

module.exports = TextInput;
