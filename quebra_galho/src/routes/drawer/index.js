import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {drawerStyles} from '../../styles/DefaultStyles';
import Icon from 'react-native-vector-icons/Entypo';

const btnMenuLogin = (
  <TouchableOpacity
    onPress={() => {
      navigator('Login');
    }}>
    <View style={drawerStyles.containerMenuLine}>
      <View style={drawerStyles.containerIcon}>
        <Icon name="login" size={30} color="#000" />
      </View>
      <Text style={drawerStyles.textMenu}>Login</Text>
    </View>
  </TouchableOpacity>
);

const btnMenuLogout = (
  <TouchableOpacity
    onPress={() => {
      navigator('Home');
    }}>
    <View style={drawerStyles.containerMenuLine}>
      <View style={drawerStyles.containerIcon}>
        <Icon name="log-out" size={30} color="#000" />
      </View>
      <Text style={drawerStyles.textMenu}>Sair</Text>
    </View>
  </TouchableOpacity>
);

class DrawerContent extends Component {
  render() {
    return (
      <View style={drawerStyles.container}>
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

          {user.user.id ? btnMenuLogout : btnMenuLogin}
        </View>
      </View>
    );
  }
}

// const DrawerContent = ({user}) => (

// );

const mapStateToProps = state => ({
  user: state.user,
});

// export default DrawerContent;
export default connect(mapStateToProps)(DrawerContent);
