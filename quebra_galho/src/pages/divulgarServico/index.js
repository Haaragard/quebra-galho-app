import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';

import api from '../../api';

import {
  colors,
  formStyles,
  DivulgarServicosStyle,
} from '../../styles/DefaultStyles';

class DivulgarServico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      service: {
        nome: 'Desenvolver Software',
        descricao: 'Desenvolvimento de software WEB, Desktop, Mobile.',
        fotoPrincipal: '',
        fotos: [String],
        createdAt: '2019-11-03',
      },
    };

    this.getUserData();
  }
  render() {
    return (
      <View style={DivulgarServicosStyle.content}>
        <View style={formStyles.form}>
          <View style={formStyles.inputGroupField}>
            <Text style={formStyles.labelInput}>Nome</Text>
            <View style={formStyles.borderInputText}>
              <TextInput
                style={formStyles.inputText}
                placeholderTextColor={colors.placeHolderTextColor}
                placeholder="Nome"
                maxLength={40}
                autoCapitalize="words"
                autoCompleteType="name"
                // onChangeText={this.handleNomeChange}
                // value={this.state.nome}
              />
            </View>
          </View>
        </View>
        <View style={{marginTop: 50}}>
          <Button
            title="Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
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
    } else {
      try {
        const response = await api.post('/user/token', {
          token: this.props.user.status.token,
        });

        this.setState({user: response.data.user});
      } catch (err) {
        ToastAndroid.show(
          'Houve um problema com a verificação das suas credenciais!',
          ToastAndroid.SHORT,
        );
      }
    }
  };

  editName = async () => {
    console.warn('Name editing...');
  };
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user,
});

export default connect(mapStateToProps)(DivulgarServico);
