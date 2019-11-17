import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ToastAndroid,
  Button,
} from 'react-native';

import {connect} from 'react-redux';

import api from '../../api';

class Agenda extends Component {
  constructor(props) {
    super(props);
    this._checkLoginUser();
    this.state = {
      user: this.props.user.user,
      hiredServices: [],
    };
  }

  _checkLoginUser = () => {
    if (!this.props.user.status.auth) {
      ToastAndroid.show(
        'É preciso estar logado para acessar essa área!',
        ToastAndroid.SHORT,
      );
      this.props.navigation.navigate('Home');
    }
  };

  async componentDidMount() {
    try {
      console.warn('entrou')
      const response = await api.get('/hiredService/list')
      this.setState({hiredServices: response.data});
    } catch (error) {
        console.warn(error);
        ToastAndroid.show('Problema ao carregar agenda.', ToastAndroid.SHORT);
    }
    console.warn('tamanho: ' + this.state.hiredServices.length)
  }

  _load_data = async () => {
    try {
        console.warn('entrou')
        const response = await api.get('/hiredService/list')
        this.setState({hiredServices: response.data});
    } catch (error) {
        console.warn(error);
        ToastAndroid.show('Problema ao carregar agenda.', ToastAndroid.SHORT);
    }
    console.warn('tamanho: ' + this.state.hiredServices.length)
  }

  render() {
    const services = this.state.hiredServices.map(service => {
        console.warn(service);
        return (<Text key={service._id}>
                    { service.name }
                </Text>)
    })

    console.warn(services)
      
    return (
        <View >
            { services }
        </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
    ...props,
    user: state.user,
  });
  
  export default connect(mapStateToProps)(Agenda);