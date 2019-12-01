import React, {Component} from 'react';

import {
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../store/actions/user';

import api, {BASEURL} from '../../api';

import {styles, formStyles} from '../../styles/DefaultStyles';

import moment from 'moment';

import Geolocation from 'react-native-geolocation-service';
import DatePicker from 'react-native-datepicker';

const DATA = {
  _id: 'test1',
  nome: 'Test',
  descricao: 'Uma descrição',
  fotoPrincipal: '',
  fotos: [String],
  valor: '',
  createdAt: '',
  location: '',
};

class gerenciarServico extends Component {
  constructor(props) {
    super(props);
    const todayDate = moment(new Date())
    
    this.state = {
      dadosServico: DATA,
      newHiredService: {
        serviceDate: '', 
        serviceTime: '',
        currentCity: ''
      },
      todayDate: todayDate.format('DD/MM/YYYY'),
      maxDate: todayDate.add(1, 'years').format('DD/MM/YYYY')
    };  
  }

  async componentDidMount() {
    // this._setLists();
    // await Geolocation.getCurrentPosition(
    //   async pos => {
    //     console.warn(pos)
    //   }
    // )
  }

  _setLists = async () => {
    _setListGeoLocation();
    _setListAccess();
    this.setState({
      listServicosMaisAcessados: DATA,
      listServicosMaisProximos: DATA,
    });
  };

  _setListGeoLocation = async () => {
    const service = {};

    try {
      // api.post('/service/list');
    } catch (error) {}
  };

  _setListAccess = async () => {
    const service = {
      acessos: 'desc',
    };
  };

  handleServiceHire = async () => {
    // api.post('', {service: this.state.newHiredService)
  }

  render() {
    return (
        <View style={{alignItems: 'center', marginTop: 20}}>
          {/* <ScrollView contentContainerStyle={styles.contentScrollView}> */}
            <Text style={{alignItems: 'center', marginTop: 20}}>Título do Serviço</Text>
               <View style={{alignItems: 'center', marginTop: 20, marginBottom: 20}}> 
                <Image  style={{width: 80, height: 150, alignItems: 'center'}}
                source={{uri: this.state.dadosServico.service}}
                />
                </View>
            <View style={formStyles.groupText}>
              <Text style={formStyles.textLabel}>Freelancer:</Text>
              <Text style={formStyles.textValue}>
                {this.state.dadosServico.nome} 
              </Text>
            </View>
            <View style={formStyles.groupText}>
              <Text style={formStyles.textLabel}>Descrição:</Text>
              <Text style={formStyles.textValue}>
                text, text,text,text,text
              </Text>
            </View>
            <View style={formStyles.groupText}>
              <Text style={formStyles.textLabel}>Categoria:</Text>
              <Text style={formStyles.textValue}>
                texto
              </Text>
            </View>
            <View style={formStyles.groupText}>
              <Text style={formStyles.textLabel}>Agendar Horário:</Text>
              <View style={{...formStyles.borderInputText, height: 20}}>
                <TextInput
                  style={formStyles.inputText}
                  placeholderTextColor="#C1C1C1"
                  maxLength={40}
                  autoCapitalize="none"
                />
              </View>
            </View>
            <View style={formStyles.groupText}>
              <Text style={formStyles.textLabel}>Agendar Data:</Text>
              <View style={formStyles.borderInputText}>
                <DatePicker
                  date={this.state.newHiredService.serviceDate}
                  mode="date"
                  placeholder="Agende a data"
                  format="DD/MM/YYYY"
                  maxDate={this.state.maxDate}
                  minDate={this.state.todayDate}
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  onDateChange={date => {
                    this.setState({
                      newHiredService: {
                        ...this.state.newHiredService,
                        serviceDate: date
                      }
                    });
                  }}
                />
              </View>
            </View>
            <View style={formStyles.groupText}>
              <Text style={formStyles.textLabel}>Local - Cidade:</Text>
              <View style={{...formStyles.borderInputText, height: 20}}>
                <TextInput
                  style={formStyles.inputText}
                  placeholderTextColor="#C1C1C1"
                  maxLength={40}
                  autoCapitalize="none"
                  value={this.state.newHiredService.currentCity}
                />
              </View>
            </View>
            <View>
              <Button title="Entrar" onPress={this.handleServiceHire} />
            </View>
          {/* </ScrollView> */}
        </View>
    )}   
}


const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(gerenciarServico);
