import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as UserActions from '../../store/actions/user';

import api from '../../api';

import {drawerStyles} from '../../styles/DefaultStyles';
import Icon from 'react-native-vector-icons/AntDesign';

import ProfileImage from '../../components/user/profileImage';

const UserHeader = props => (
  <View style={drawerStyles.containerUser}>
    <View style={drawerStyles.containerUserImg}>
      <ProfileImage height={60} width={60} />
    </View>
    <View style={drawerStyles.containerUserData}>
      <View style={drawerStyles.containerGroupUserData}>
        <Text style={drawerStyles.textUserDataLabel}>Olá,</Text>
        <Text style={drawerStyles.textUserData}>{props.user.user.nome}</Text>
      </View>                      
    </View>
  </View>
);

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      user: {},
    };
  }

  componentDidMount() {
    this.requestUserData();
  }

  render() {
    return (
      <View style={drawerStyles.container}>
        <View style={drawerStyles.header}>
          {this.state.auth ? <UserHeader user={this.state} /> : null}
        </View>
        <View style={drawerStyles.content}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}>
            <View style={drawerStyles.containerMenuLine}>
            <View style={drawerStyles.containerIcon}>
                <Icon
                  name='home'
                  size={25}
                  color="#898989"
                />
              </View>
              <Text style={drawerStyles.textContainerMenuLine}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('DivulgarServico');
            }}>
            <View style={drawerStyles.containerMenuLine}>
              <View style={drawerStyles.containerIcon}>
                <Icon
                  name='notification'
                  size={25}
                  color="#898989"
                />
              </View>
              <Text style={drawerStyles.textContainerMenuLine}>
                Divulgar Serviços
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Historico');
          }}>
            <View style={drawerStyles.containerMenuLine}>
              <View style={drawerStyles.containerIcon}>
                <Icon
                  name='database'
                  size={25}
                  color="#898989"
                />
              </View>
              <Text style={drawerStyles.textContainerMenuLine}>
                Histórico de Serviços
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Agenda')}}>
            <View style={drawerStyles.containerMenuLine}>
            <View style={drawerStyles.containerIcon}>
                <Icon
                  name='calendar'
                  size={25}
                  color="#898989"
                />
              </View>
              <Text style={drawerStyles.textContainerMenuLine}>Agenda</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={drawerStyles.containerMenuLine}>
              <View style={drawerStyles.containerIcon}>
                <Icon
                  name='creditcard'
                  size={25}
                  color="#898989"
                />
                </View>
              <Text style={drawerStyles.textContainerMenuLine}>
                Confirmação de pagamento
              </Text>
            </View>
          </TouchableOpacity>

          <View style={drawerStyles.separator}></View>
          {this.state.auth ? this.buttonMenuMinhaConta() : undefined}
          <TouchableOpacity
            onPress={() => {
              this.state.auth
                ? this.handlerLogout()
                : this.props.navigation.navigate('Login');
            }}>
            <View style={drawerStyles.containerMenuLine}>
              <View style={drawerStyles.containerIcon}>
                <Icon
                  name={this.state.auth ? 'logout' : 'login'}
                  size={25}
                  color="#898989"
                />
              </View>
              <Text style={drawerStyles.textMenu}>
                {this.state.auth ? 'Logout' : 'Login'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  requestUserData = async () => {
    if (this.props.user.status.auth) {
      let response = await api.post('/user/token', {
        token: this.props.user.status.token,
      });
      if (response.data.auth) {
        this.setState({user: response.data.user});
        this.setState({auth: response.data.auth});
      }
    }
  };

  handlerLogout = async () => {
    try {
      await AsyncStorage.removeItem('@QuebraGalhoOficial:token', err => {
        if (err) throw Exception('Erro no AsyncStorage');
        this.props.toggleStatusUser({auth: false, token: null});
        this.props.toggleUser({});
        this.props.navigation.navigate('LoadingScreen');
      });
    } catch (error) {
      ToastAndroid.show(
        'Não foi possível realizar o Logout.',
        ToastAndroid.SHORT,
      );
    }
  };

  buttonMenuMinhaConta = () => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('MinhaConta')}>
      <View style={drawerStyles.containerMenuLine}>
      <View style={drawerStyles.containerIcon}>
          <Icon
            name='user'
            size={25}
            color="#898989"
            />
          </View>
        <Text style={drawerStyles.textMenu}>Minha conta</Text>
      </View>
    </TouchableOpacity>
  );
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
