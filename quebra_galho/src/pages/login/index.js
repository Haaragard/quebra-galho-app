import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ToastAndroid,
} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {styles, formStyles} from '../../styles/DefaultStyles';
import Icon from 'react-native-vector-icons/Entypo';

import * as UserActions from '../../store/actions/user';

import api from '../../api';

const showPassIcon = (
  <Icon name="eye" size={30} color="#000" style={formStyles.btnRightInput} />
);
const hidePassIcon = (
  <Icon
    name="eye-with-line"
    size={30}
    color="#000"
    style={formStyles.btnRightInput}
  />
);

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPass: true,
    };
  }

  static navigationOptions = {
    title: 'Login',
  };

  handleEmailChange = email => {
    this.setState({email});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('Cadastro');
  };

  handleShowPass = () => {
    this.setState({showPass: !this.state.showPass});
  };

  pressBtnLogin = () => {
    ToastAndroid.show(this.state, ToastAndroid.SHORT);
    this._signInAsync;
  };

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      ToastAndroid.show(
        'Preencha usuário e senha para continuar!',
        ToastAndroid.SHORT,
      );
    } else {
      try {
        const response = await api.post('/auth/login', {
          email: this.state.email,
          senha: this.state.password,
        });

        ToastAndroid.show('Login realizado com sucesso!', ToastAndroid.SHORT);

        await AsyncStorage.setItem(
          '@QuebraGalhoOficial:token',
          response.data.token,
        );

        this.props.toggleUser(response.data);

        this.props.navigation.navigate('App');
      } catch (err) {
        console.warn(err);
        ToastAndroid.show(
          'Houve um problema com o login, verifique suas credenciais!',
          ToastAndroid.SHORT,
        );
      }
    }
  };

  render() {
    return (
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.contentScrollView}>
          <View style={styles.groupText}>
            <Text style={styles.primaryGreatTitle}>Conecte-se</Text>
            <Text style={styles.secondaryGreatTitle}>
              e contrate ou começe seus serviços agora!
            </Text>
          </View>
          <View style={formStyles.form}>
            <View style={formStyles.inputGroupField}>
              <Text style={formStyles.labelInput}>E-mail:</Text>
              <View style={formStyles.borderInputText}>
                <TextInput
                  style={formStyles.inputText}
                  placeholderTextColor="#C1C1C1"
                  placeholder="meu.email@quebra-galho.com"
                  maxLength={40}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  onChangeText={this.handleEmailChange}
                  value={this.state.email}
                />
              </View>
            </View>
            <View style={formStyles.inputGroupField}>
              <Text style={formStyles.labelInput}>Senha:</Text>
              <View style={formStyles.borderInputText}>
                <TextInput
                  style={formStyles.inputText}
                  placeholderTextColor="#C1C1C1"
                  placeholder="******"
                  maxLength={30}
                  autoCapitalize="none"
                  autoCompleteType="password"
                  secureTextEntry={this.state.showPass}
                  onChangeText={this.handlePasswordChange}
                  value={this.state.password}
                />
                <TouchableOpacity onPress={this.handleShowPass}>
                  {this.state.showPass ? showPassIcon : hidePassIcon}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.groupText}>
            <Text style={styles.normalText}>Ainda não possui uma conta?</Text>
            <Text
              style={styles.linksPage}
              onPress={this.handleCreateAccountPress}>
              Cadastre-se já!
            </Text>
          </View>
          <View style={formStyles.btGroup}>
            <View style={formStyles.btSubmit}>
              <Button title="Entrar" onPress={() => this.handleSignInPress()} />
            </View>
          </View>
        </ScrollView>
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
)(Login);
