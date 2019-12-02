import React, {Component} from 'react';

import {View, Text, ScrollView, Button, ToastAndroid} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {styles, formStyles, PagamentoStyle} from '../../styles/DefaultStyles';
import Icon from 'react-native-vector-icons/Entypo';
import api from '../../api';

class VisualizarServico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: {
        _id: this.props.service._id,
        nome: '',
        descricao: '',
      },
      userService: {
        nome: '',
        sobrenome: '',
      },
      newHiredService: {
        dataHora: '',
        local: '',
      },
    };
    this._addAccessToService();
  }

  componentDidMount() {
    this._getServiceData();
  }

  render() {
    return (
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.contentScrollView}>
          <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Serviço:</Text>
            <Text style={formStyles.textValue}>
              {this.state.service.nome ? this.state.service.nome : ''}
            </Text>
          </View>
          <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Freelancer:</Text>
            <Text style={formStyles.textValue}>
              {this.state.userService.nome
                ? `${this.state.userService.nome} ${this.state.userService.sobrenome}`
                : ''}
            </Text>
          </View>
          <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Valor:</Text>
            <Text style={formStyles.textValue}>
              {this.state.service.valor ? `R$${this.state.service.valor}` : ''}
            </Text>
          </View>
          <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Marcar data/hora:</Text>
            <Text style={formStyles.textValue}>
              {this.state.newHiredService.dataHora
                ? this.state.newHiredService.dataHora
                : ''}
            </Text>
          </View>
          <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Local:</Text>
            <Text style={formStyles.textValue}>
              {this.state.newHiredService.local
                ? this.state.newHiredService.local
                : ''}
            </Text>
          </View>
          <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Avaliação:</Text>
            {/* {this.renderReputation()} */}
          </View>
          <View style={formStyles.btGroup}>
            <View style={formStyles.btSubmit}>
              <Button
                title="Contratar Serviço"
                onPress={() => console.warn('Contratou')}
              />
            </View>
          </View>
          <View style={formStyles.btGroup}>
            <View style={formStyles.btSubmit}>
              <Button
                title="Cancelar"
                onPress={() => {
                  this.props.navigation.navigate('Home');
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  _addAccessToService = async () => {
    await api.post('/service/accesses/plus', {service: this.state.service});
  };

  _getServiceData = async () => {
    await api
      .post('/service/getById', {service: this.state.service})
      .then(response => {
        if (response.data.service) {
          this.setState({service: response.data.service});
        }
      })
      .catch(err => {
        ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
      });

    await api
      .post('/user/getById', {user: {_id: this.state.service._userId}})
      .then(response => {
        if (response.data.user) {
          this.setState({userService: response.data.user});
        }
      })
      .catch(err => {
        ToastAndroid.show(err.response.data.error, ToastAndroid.SHORT);
      });
  };
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user,
  service: state.service,
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(Actions, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(VisualizarServico);
