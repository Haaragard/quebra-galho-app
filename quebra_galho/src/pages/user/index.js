import React, {Component} from 'react';

import {View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../store/actions/user';

import api from '../../api';

import {styles} from '../../styles/DefaultStyles';

class MinhaConta extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View />;
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MinhaConta);
