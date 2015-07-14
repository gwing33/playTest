import React from 'react';
import StyleSheet from 'react-style';

var styles = StyleSheet.create({
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
    fontSmoothing: 'antialiased',
  },
  primary: {},
  secondary: {}
});

class Button extends React.Component {
  render() {
    let btn_styles = this.props.isPrimary ? styles.primary : styles.secondary;

    return <input onClick={this.props.onClick} styles={[ styles.base, btn_styles, this.props.styles ]} type={this.props.type} value={this.props.value} />;
  }
}

let PropTypes = React.PropTypes;
Button.propTypes = {
  isPrimary: PropTypes.bool,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  styles: PropTypes.object
};
Button.defaultProps = {
  isPrimary: true,
  type: 'button',
  styles: {}
};

export default Button;
