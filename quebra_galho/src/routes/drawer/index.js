import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {drawerStyles} from '../../styles/DefaultStyles';
import Icon from 'react-native-vector-icons/Entypo';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    const state = {
      user: {},
    };
  }

  requestUserData = async () => {
    if (this.props.user.auth) {
      console.log('mae do klaito');
      let response = await api.post('/auth/token', {
        token: this.props.users.token,
      });

      if (response.data.auth) {
        this.setState({user: response.data.user});
      }
    }
  };

  componentDidMount = () => {
    this.requestUserData();
  };

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
                <Text style={drawerStyles.textUserDataLabel}>
                  {this.state.user.nome ? 'Nome:' : ''}
                </Text>
                <Text style={drawerStyles.textUserData}>
                  {this.state.user.nome ? this.state.user.nome : ''}
                </Text>
              </View>
              <View style={drawerStyles.containerGroupUserData}>
                <Text style={drawerStyles.textUserDataLabel}>
                  {this.state.user.cpf ? 'CPF:' : ''}
                </Text>
                <Text style={drawerStyles.textUserData}>
                  {this.state.user.cpf ? this.state.user.cpf : ''}
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
                  name={this.state.user.auth ? 'log-out' : 'login'}
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
