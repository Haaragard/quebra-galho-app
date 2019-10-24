import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

class ProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View></View>;
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user,
});

export default connect(mapStateToProps)(ProfileImage);
