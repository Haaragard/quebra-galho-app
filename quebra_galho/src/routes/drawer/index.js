import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as UserActions from '../../store/actions/user';

import api, {BASEURLIMG} from '../../api';

import {drawerStyles} from '../../styles/DefaultStyles';
import Icon from 'react-native-vector-icons/Entypo';

const UserHeader = props => (
  <View style={drawerStyles.containerUser}>
    <View style={drawerStyles.containerUserImg}>
      <Image href={{uri: BASEURLIMG + props.user.user.avatar}} />
    </View>
    <View style={drawerStyles.containerUserData}>
      <View style={drawerStyles.containerGroupUserData}>
        <Text style={drawerStyles.textUserDataLabel}>Nome:</Text>
        <Text style={drawerStyles.textUserData}>{props.user.user.nome}</Text>
      </View>
      <View style={drawerStyles.containerGroupUserData}>
        <Text style={drawerStyles.textUserDataLabel}>CPF:</Text>
        <Text style={drawerStyles.textUserData}>{props.user.user.cpf}</Text>
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
              <Text style={drawerStyles.textContainerMenuLine}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('DivulgarServico');
            }}>
            <View style={drawerStyles.containerMenuLine}>
              <Text style={drawerStyles.textContainerMenuLine}>
                Divulgar Serviços
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={drawerStyles.containerMenuLine}>
              <Text style={drawerStyles.textContainerMenuLine}>
                Histórico de Serviços
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={drawerStyles.containerMenuLine}>
              <Text style={drawerStyles.textContainerMenuLine}>Agenda</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={drawerStyles.containerMenuLine}>
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
                  name={this.state.auth ? 'log-out' : 'login'}
                  size={30}
                  color="#000"
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
        // this.props.toggleStatusUser({auth: false, token: null});
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
          {/* <Icon
            name={this.state.auth ? 'log-out' : 'login'}
            size={30}
            color="#000"
          /> */}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerContent);
