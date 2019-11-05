import React, {Component} from 'react';

import {View, Text, TouchableOpacity, InputText} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../store/actions/user';

import api from '../../api';

import {styles, MinhaContaStyles} from '../../styles/DefaultStyles';

import ProfileImage from '../../components/user/profileImage';

import Icon from 'react-native-vector-icons/Entypo';

class MinhaConta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cpf: '',
      nome: '',
      sobrenome: '',
      email: '',
      dataNascimento: '',
      senha: '******',
      avatar: '',
    };

    this.getUserData();
  }
  render() {
    return (
      <View style={MinhaContaStyles.content}>
        <View style={MinhaContaStyles.headerPerfil}>
          <ProfileImage />
          <View style={MinhaContaStyles.nameEditableView}>
            <Text style={MinhaContaStyles.nameEditableText}>
              {this.state.nome + ' ' + this.state.sobrenome}
            </Text>
            <TouchableOpacity
              onPress={() => this.editName()}
              style={MinhaContaStyles.editIcon}>
              <Icon name="edit" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={MinhaContaStyles.bodyPerfil}>
          <View style={MinhaContaStyles.groupShowData}>
            <Text style={MinhaContaStyles.editableTextLabel}>E-mail:</Text>
            <View style={MinhaContaStyles.editableView}>
              <Text style={MinhaContaStyles.editableText}>
                {this.state.email}
              </Text>
              <TouchableOpacity
                onPress={() => this.editName()}
                style={MinhaContaStyles.editIcon}>
                <Icon name="edit" size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={MinhaContaStyles.groupShowData}>
            <Text style={MinhaContaStyles.editableTextLabel}>Senha:</Text>
            <View></View>
            <Text style={MinhaContaStyles.editableText}>
              {this.state.senha}
            </Text>
            <TouchableOpacity
              onPress={() => this.editName()}
              style={MinhaContaStyles.editIcon}>
              <Icon name="edit" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={MinhaContaStyles.groupShowData}>
            <Text style={MinhaContaStyles.editableTextLabel}>
              Certificados:
            </Text>
            <Text style={MinhaContaStyles.editableText}>
              {this.state.nome + ' ' + this.state.sobrenome}
            </Text>
            <TouchableOpacity
              onPress={() => this.editName()}
              style={MinhaContaStyles.editIcon}>
              <Icon name="edit" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  getUserData = async () => {
    if (!this.props.user.status.auth) {
      ToastAndroid.show(
        'É preciso estar logado para acessar essa área!',
        ToastAndroid.SHORT,
      );
      this.props.navigation.navigate('Home');
    }

    await api
      .post('/user/token', {token: this.props.user.status.token})
      .then(response => {
        this.setState({...this.state, ...response.data.user});
      })
      .catch(err => {
        ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
      });
  };

  editName = async () => {
    console.warn('Name editing...');
  };
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
)(MinhaConta);
