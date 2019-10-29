import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

class ProfileImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: '#A358',
          width: 130,
          height: 130,
          borderColor: '#000',
          borderWidth: 1,
          borderRadius: 65,
        }}></View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user,
});

export default connect(mapStateToProps)(ProfileImage);
