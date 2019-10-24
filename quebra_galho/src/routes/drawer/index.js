import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

import api from '../../api';

import {drawerStyles} from '../../styles/DefaultStyles';
import Icon from 'react-native-vector-icons/Entypo';

// import

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      user: {},
    };

    this.requestUserData();
  }

  render() {
    return (
      <View style={drawerStyles.container}>
        <View style={drawerStyles.header}>
          <View style={drawerStyles.containerUser}>
            <View style={drawerStyles.containerUserImg}>
              {/* <Image href={this.state.auth ? require('./svg/1f604.svg') : /> */}
            </View>
            <View style={drawerStyles.containerUserData}>
              <View style={drawerStyles.containerGroupUserData}>
                <Text style={drawerStyles.textUserDataLabel}>
                  {this.state.auth ? 'Nome:' : ''}
                </Text>
                <Text style={drawerStyles.textUserData}>
                  {this.state.auth ? this.state.user.nome : ''}
                </Text>
              </View>
              <View style={drawerStyles.containerGroupUserData}>
                <Text style={drawerStyles.textUserDataLabel}>
                  {this.state.auth ? 'CPF:' : ''}
                </Text>
                <Text style={drawerStyles.textUserData}>
                  {this.state.auth ? this.state.user.cpf : ''}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={drawerStyles.content}>
          <TouchableOpacity>
            <View style={drawerStyles.containerMenuLine}>
              <Text>Menu 1</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={drawerStyles.containerMenuLine}>
              <Text>Menu 2</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={drawerStyles.containerMenuLine}>
              <Text>Menu 3</Text>
            </View>
          </TouchableOpacity>

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
    console.warn('bacon');
  };
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user,
});

export default connect(mapStateToProps)(DrawerContent);
