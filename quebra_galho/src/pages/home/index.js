import React, {Component} from 'react';

import {
  View,
  FlatList,
  Text,
  Slider,
  TouchableOpacity,
  Image,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../store/actions/user';
import * as ServiceActions from '../../store/actions/service';

import api, {BASE_URL_IMG} from '../../api';

import {styles} from '../../styles/DefaultStyles';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maisAcessadosPage: 0,
      maisProximosPage: 0,
      maxDistanceMaisProximos: 10000,
      listServicosMaisAcessados: [],
      listServicosMaisProximos: [],
    };
  }

  componentDidMount() {
    this._setLists();
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.contentServicosMaisAcessado}>
          <Text style={{marginTop: 10}}>Serviços mais procurados</Text>
          <View style={styles.containerFlatListMaisAcessado}>
            <FlatList
              horizontal
              style={styles.padraoFLatList}
              ItemSeparatorComponent={() => (
                <View style={styles.separatorLeft} />
              )}
              ListEmptyComponent={() => (
                <View style={styles.contentFlatListEmpty}>
                  <Text>Nenhum encontrado...</Text>
                </View>
              )}
              data={this.state.listServicosMaisAcessados}
              keyExtractor={(item, index) => item._id}
              onEndReached={() =>
                this.state.listServicosMaisAcessados.length > 9
                  ? this._nextPageListByAccess()
                  : undefineddd
              }
              onEndReachedThreshold={0.1}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.touchableServicoSmall}
                  onPress={() => {
                    this._visualizeSelectedService(item._id);
                  }}>
                  <View style={styles.dadosServicoSmall}>
                    <Image
                      source={{
                        uri: `${BASE_URL_IMG}service/${item.fotoPrincipal}`,
                      }}
                      style={styles.imageServicoSmall}
                    />
                    <View style={styles.infosServicoListagemSmall}>
                      <Text
                        numberOfLines={1}
                        style={styles.nomeServicoListagemSmall}>
                        {item.nome}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={styles.descricaoServicoSmall}>
                        {item.descricao}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={styles.contentServicosProximos}>
          {/* <Text style={{marginTop: 10}}>Distância</Text> */}
          {/* <Slider style={{width: '100%', height: 50}} /> */}
          <Text style={{marginTop: 10}}>Serviços próximos de você</Text>
          <View style={styles.containerFlatListProximo}>
            <FlatList
              style={styles.padraoFLatList}
              ItemSeparatorComponent={() => (
                <View style={styles.separatorDown} />
              )}
              ListEmptyComponent={() => (
                <View style={styles.contentFlatListEmpty}>
                  <Text>Nenhum encontrado...</Text>
                </View>
              )}
              data={this.state.listServicosMaisProximos}
              keyExtractor={(item, index) => item._id}
              onEndReached={() =>
                this.state.listServicosMaisProximos.length > 9
                  ? this._nextPageListByLocation()
                  : undefined
              }
              onEndReachedThreshold={0.1}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.touchableServicoBig}
                  onPress={() => {
                    this._visualizeSelectedService(item._id);
                  }}>
                  <View style={styles.dadosServicoBig}>
                    <Image
                      source={{
                        uri: `${BASE_URL_IMG}service/${item.fotoPrincipal}`,
                      }}
                      style={styles.imageServicoBig}
                    />
                    <View style={styles.infosServicoListagemSmall}>
                      <Text
                        numberOfLines={1}
                        style={styles.nomeServicoListagemSmall}>
                        {item.nome}
                      </Text>
                      <Text
                        numberOfLines={3}
                        style={styles.descricaoServicoListagemSmall}>
                        {item.descricao}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    );
  }

  _visualizeSelectedService = async index => {
    await this.props.toggleSelectedService(index);
    this.props.navigation.navigate('VisualizarServico');
  };

  _handleLocationSearchSlider = () => {
    this.setState({maisProximosPage: 0});
    this._setListGeoLocation();
  };

  _nextPageListByAccess = () => {
    let newPage = this.state.maisAcessadosPage + 1;
    this.setState({maisAcessadosPage: newPage});
    this._setListAccess(newPage);
  };

  _nextPageListByLocation = () => {
    let newPage = this.state.maisProximosPage + 1;
    this.setState({maisProximosPage: newPage});
    this._setListGeoLocation(newPage);
  };

  _setLists = async () => {
    this._setListAccess();
    this._setListGeoLocation();
  };

  _setListGeoLocation = async (page = 0) => {
    let post = {
      location: this.props.user.location.coordinates,
      list: {
        page,
        limit: 10,
      },
    };

    try {
      await api
        .post('/service/list/geoLocation', post)
        .then(response => {
          let services = this.state.listServicosMaisProximos;
          response.data.services.map((val, index) => {
            services.push(val);
          });

          this.setState({
            listServicosMaisProximos: services,
          });
        })
        .catch(err => {
          ToastAndroid.show(
            `Nenhum serviço encontrado na distância de ${err.response.data.distance}KMs.`,
            ToastAndroid.SHORT,
          );
        });
    } catch (error) {
      ToastAndroid.show(
        `Ocorreu algum erro inesperado na busca de serviços pela localização.`,
        ToastAndroid.SHORT,
      );
    }
  };

  _setListAccess = async (page = 0) => {
    let post = {
      list: {
        page,
        limit: 10,
      },
    };

    try {
      await api
        .post('/service/list/mostAccess', post)
        .then(response => {
          let services = this.state.listServicosMaisAcessados;
          response.data.services.map((val, index) => {
            services.push(val);
          });

          this.setState({
            listServicosMaisAcessados: services,
          });
        })
        .catch(err => {
          ToastAndroid.show(
            'Não foi possível buscar esse tipo de serviço.',
            ToastAndroid.SHORT,
          );
        });
    } catch (error) {
      ToastAndroid.show(
        `Ocorreu algum erro inesperado na busca de serviços pela localização.`,
        ToastAndroid.SHORT,
      );
    }
  };
}

const mapStateToProps = (state, props) => ({
  ...props,
  user: state.user,
  service: state.service,
});

const mapDispatchToProps = dispatch => {
  let actions = {
    ...UserActions,
    ...ServiceActions,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
