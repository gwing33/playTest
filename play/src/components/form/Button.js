import React from 'react';

var styles = {
  base: {
    width: '100%',
    height: '60px',
    borderRadius: '4px',
    border: 0,
    outline: 0,
    borderTop: '1px solid #41bcd4',
    borderBottom: '1px solid #0292b3',
    backgroundColor: '#11abc9',
    color: '#fff',
    textAlign: 'center',
    fontSize: '18px',
    '-webkit-font-smoothing': 'antialiased',
  },
  primary: {},
  secondary: {}
}

class Button extends React.Component {
  getDefaultProps() {
    return {
      isPrimary: true,
      type: 'button',
      styles: {}
    };
  }

  render() {
    let btn_styles = this.props.isPrimary ? styles.primary : styles.secondary;

    return <input styles={[ styles.base, btn_styles, this.props.styles ]} type={this.props.type} value={this.props.value} />;
  }
}

let PropTypes = React.PropTypes;
Button.propTypes = {
  isPrimary: PropTypes.bool,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  styles: PropTypes.object
};

module.exports = Button;
