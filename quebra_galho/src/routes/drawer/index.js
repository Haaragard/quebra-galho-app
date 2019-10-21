import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {drawerStyles} from '../../styles/DefaultStyles';
import Icon from 'react-native-vector-icons/Entypo';

const componentHeader = ({user}) => (
  <View style={drawerStyles.header}>
    <View style={drawerStyles.containerUser}>
      <View style={drawerStyles.containerUserImg}>
        <Image />
      </View>
      <View style={drawerStyles.containerUserData}>
        <View style={drawerStyles.containerGroupUserData}>
          <Text style={drawerStyles.textUserDataLabel}>Nome:</Text>
          <Text style={drawerStyles.textUserData}>{user.user.nome}</Text>
        </View>
        <View style={drawerStyles.containerGroupUserData}>
          <Text style={drawerStyles.textUserDataLabel}>CPF:</Text>
          <Text style={drawerStyles.textUserData}>{user.user.cpf}</Text>
        </View>
      </View>
    </View>
  </View>
);

const componentAuth = ({user}) => {
  return {
    auth: user.auth,
    button: (
      <View style={drawerStyles.containerMenuLine}>
        <View style={drawerStyles.containerIcon}>
          <Icon
            name={this.user.auth ? 'log-out' : 'login'}
            size={30}
            color="#000"
          />
        </View>
        <Text style={drawerStyles.textMenu}>
          {user.auth ? 'Logout' : 'Login'}
        </Text>
      </View>
    ),
  };
};

export default class DrawerContent extends Component {
  render() {
    return (
      <View style={drawerStyles.container}>
        <DrawerHeader />
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
              DrawerAuths.auth
                ? this.props.navigation.navigate('Logout')
                : this.props.navigation.navigate('Login');
            }}>
            <DrawerAuths.button />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

// export default DrawerContent;
const DrawerHeader = connect(mapStateToProps)(componentHeader);
const DrawerAuths = connect(mapStateToProps)(componentAuth);
