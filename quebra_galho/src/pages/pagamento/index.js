import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  Picker,
  TextInput,
  TouchableOpacity,
  Button,
  ToastAndroid,
  Alert,
} from 'react-native';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import {styles, formStyles, PagamentoStyle} from '../../styles/DefaultStyles';
import Icon from 'react-native-vector-icons/Entypo';

import * as ServiceActions from '../../store/actions/service';

class Pagamento extends Component {
  constructor(props) {
    super(props);

    this.state = {
      service: '',
      current_reputation: 0,
    };
  }

  componentDidMount() {
    this.props.requestServices();
  }

  renderSelect = () => {
    return (
      <Picker
        selectedValue={this.state.service}
        style={{height: 50, width: '100%'}}
        onValueChange={service => this.setState({service})}>
        <Picker.Item label="Selecione" value="" />
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    );
  };
  // renderReputation = () => {
  //   return (
  //     <Picker
  //       selectedValue={this.state.service}
  //       style={{height: 50, width: '100%', }}
  //       onValueChange={service =>
  //         this.setState({ service })
  //       }>
  //       <Picker.Item label="Selecione" value="" />
  //       <Picker.Item label="Péssimo" value="pessimo" />
  //       <Picker.Item label="Ruim" value="ruim" />
  //       <Picker.Item label="Regular" value="regular" />
  //       <Picker.Item label="Bom" value="bom" />
  //       <Picker.Item label="Ótimo" value="otimo" />
  //     </Picker>
  //   )
  // }

  renderReputation = () => {
    const reputations = [0, 1, 2, 3, 4];
    return reputations.map(reputation => {
      let color = '#fff';
      console.warn('passou');
      console.warn(this.state.current_reputation);
      if (this.state.current_reputation >= reputation) {
        color = '#000';
      }
      return (
        <View key={reputation}>
          <Button
            style={{color}}
            onPress={() => {
              this.setState({
                current_reputation: reputation,
              });
              console.warn('foi');
            }}
            title={reputation.toString()}
          />
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.content}>
        <View style={PagamentoStyle.headerText}>
          <Text style={PagamentoStyle.warningText}>
            Atenção: Apenas confirme o pagamento após receber o
            serviço/pagamento.
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.contentScrollView}>
          <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Serviço:</Text>
            <Text style={formStyles.textValue}>Serviço</Text>
          </View>
          <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Freelancer:</Text>
            <Text style={formStyles.textValue}>nome</Text>
          </View>
          <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Valor:</Text>
            <Text style={formStyles.textValue}>0,0 reais</Text>
          </View>
          <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Horario:</Text>
            <Text style={formStyles.textValue}>00:00</Text>
          </View>
          <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Data:</Text>
            <Text style={formStyles.textValue}>DD/MM/AAAA</Text>
          </View>
          <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Avaliação:</Text>
            {this.renderReputation()}
          </View>
          <View style={formStyles.btGroup}>
            <View style={formStyles.btSubmit}>
              <Button
                title="Confirmar pagamento"
                onPress={() => console.warn('pagou')}
              />
            </View>
          </View>
          <View style={formStyles.btGroup}>
            <View style={formStyles.btSubmit}>
              <Button
                title="Cancelar"
                onPress={() => {
                  this.props.navigation.navigate('ListaServico');
                }}
              />
            </View>
          </View>
          {/* <View style={formStyles.groupText}>
            <Text style={formStyles.textLabel}>Freelancer:</Text>
            <Text style={formStyles.textValue}>
              nome
            </Text>
          </View> */}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state, props) => ({
  ...props,
  service: state.service,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ServiceActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Pagamento);
