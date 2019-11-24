import React, {Component} from 'react';

import {View, Text, TouchableOpacity, InputText} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../store/actions/user';

import Dialog from "react-native-dialog";

import api from '../../api';

import {styles, MinhaContaStyles} from '../../styles/DefaultStyles';

import ProfileImage from '../../components/user/profileImage';

import Icon from 'react-native-vector-icons/Entypo';

class MinhaConta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoad: {},
      cpf: '',
      nome: '',
      sobrenome: '',
      email: '',
      dataNascimento: '',
      senha: '******',
      avatar: '',
      isDialogVisible: false,
      popupText: ''
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  render() {
    return (
      <View style={MinhaContaStyles.content}>
        <View style={MinhaContaStyles.headerPerfil}>
          <ProfileImage user={this.state.userLoad} />
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
                onPress={() => this.editEmail()}
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
              onPress={() => this.editSenha()}
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
              onPress={() => this.editCertificado()}
              style={MinhaContaStyles.editIcon}>
              <Icon name="edit" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <Dialog.Container visible={this.state.isDialogVisible}>
            <Dialog.Title>Editar nome</Dialog.Title>
            <Dialog.Input
              onChangeText= { (text) => {this.setState({
                popupText: text
              })} } >
            </Dialog.Input>
            <Dialog.Button label="Cancelar" onPress={this.handleCancel} />
            <Dialog.Button label="Confirma" onPress={this.handleSubmit} />
          </Dialog.Container>
        </View>
      </View>
    );
  }

  showDialog = () => {
    this.setState({ isDialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ isDialogVisible: false });
  };

  handleSubmit = () => {
    
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
        this.setState({
          ...this.state,
          ...response.data.user,
          userLoad: response.data.user,
        });
      })
      .catch(err => {
        ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
      });
  };
  
  editName = async ()=> {
    console.warn('nome correto')
    this.showDialog();
  };
  editEmail = async () => {
    // this.showDialog();
  };
  editSenha = async () => {
    console.warn('Senha editing ...')
  };
  editCertificado = async () => {
    console.warn('Certificado editing ...')
  };
}

const openPopup = (title, onSubmit) => (
  <DialogInput isDialogVisible={true}
              title={title}
              message={"Message for DialogInput #1"}
              hintInput ={"HINT INPUT"}
              submitInput={ onSubmit }
              closeDialog={ () => {this.showDialog(false)}}>  
  </DialogInput>
)

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

