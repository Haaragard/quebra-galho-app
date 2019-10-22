import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {drawerStyles} from '../../styles/DefaultStyles';
import Icon from 'react-native-vector-icons/Entypo';

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
                <Text style={drawerStyles.textUserData}>
                  {this.props.user.user.nome}
                </Text>
              </View>
              <View style={drawerStyles.containerGroupUserData}>
                <Text style={drawerStyles.textUserDataLabel}>CPF:</Text>
                <Text style={drawerStyles.textUserData}>
                  {this.props.user.user.cpf}
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
              this.props.user.auth
                ? this.props.navigation.navigate('Logout')
                : this.props.navigation.navigate('Login');
            }}>
            <View style={drawerStyles.containerMenuLine}>
              <View style={drawerStyles.containerIcon}>
                <Icon
                  name={this.props.user.auth ? 'log-out' : 'login'}
                  size={30}
                  color="#000"
                />
              </View>
              <Text style={drawerStyles.textMenu}>
                {this.props.user.auth ? 'Logout' : 'Login'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user,
});

export default connect(mapStateToProps)(DrawerContent);
