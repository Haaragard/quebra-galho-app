import React, {Component} from 'react';
import {ActivityIndicator, StatusBar, View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../store/actions/user';
import api from '../api';

class LoadingScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    try {
      let userToken = await AsyncStorage.getItem('@QuebraGalhoOficial:token');

      let status = {
        auth: false,
        token: null,
      };

      if (userToken) {
        let response = await api.post('/user/token', {
          token: userToken,
        });

        console.warn(response);

        status = {
          auth: response.data.auth,
          token: response.data.auth ? userToken : null,
        };
      }
      this.props.toggleStatusUser(status);
      this.props.navigation.navigate('App');
    } catch (error) {
      let status = {
        auth: false,
        token: null,
      };
      this.props.toggleStatusUser(status);
      this.props.navigation.navigate('App');
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#1b2269'}}>
        <Image
          style={{width: '100%', height: '80%'}}
          source={require('../img/logo/quebraGalho.png')}
        />
        <ActivityIndicator size="large" color="#0000ff" />
        <StatusBar barStyle="default" />
      </View>
    );
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
)(LoadingScreen);
