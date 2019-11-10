import React, {Component} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Image,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native';
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

    requestPermissions();
  }

  _bootstrapAsync = async () => {
    let status = {
      auth: false,
      token: null,
    };
    let user = {};

    try {
      let userToken = await AsyncStorage.getItem('@QuebraGalhoOficial:token');

      if (userToken) {
        await api
          .post('/user/token', {
            token: userToken,
          })
          .then(function(response) {
            status = {
              auth: response.data.auth,
              token: response.data.auth ? userToken : null,
            };
            user = response.data.auth ? response.data.user : {};
          })
          .catch(function(err) {
            ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
          });
      }
    } catch (error) {
      ToastAndroid.show(
        'Ocorreu um erro ao tentar realizar a autenticação!',
        ToastAndroid.SHORT,
      );
    }
    this.props.toggleStatusUser(status);
    this.props.toggleUser(user);
    this.props.navigation.navigate('Home');
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

async function requestPermissions() {
  await requestCameraPermission();
  await requestFineLocationPermission();
  return;
}

async function requestCameraPermission() {
  if (
    !(await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA))
  ) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ToastAndroid.show('Agora você pode usar a câmera.', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Você não pode usar a câmera.', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.warn(error);
      ToastAndroid.show(
        'Ocorreu algum erro ao garantir acesso à câmera.',
        ToastAndroid.SHORT,
      );
    }
  }
}

async function requestFineLocationPermission() {
  if (
    !(await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ))
  ) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ToastAndroid.show(
          'Agora você pode usar a sua localização atual.',
          ToastAndroid.SHORT,
        );
      } else {
        ToastAndroid.show(
          'Você não pode usar a sua localização atual.',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.warn(error);
      ToastAndroid.show(
        'Ocorreu algum erro ao garantir acesso à localização atual.',
        ToastAndroid.SHORT,
      );
    }
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
