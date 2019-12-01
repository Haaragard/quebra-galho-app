import React, {Component} from 'react';

import {
  View,
  FlatList,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../store/actions/user';

import api, {BASEURL} from '../../api';

import {styles, stylesMenu} from '../../styles/DefaultStyles';

const DATA = [
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    descricao: 'First Item',
    fotoPrincipal: 'testefoto1',
  },
  {
    _id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    descricao: 'Second Item',
    fotoPrincipal: 'testefoto2',
  },
  {
    _id: '58694a0f-3da1-47df-bdgs6-1gsgs1e29d72',
    descricao: 'Third Item',
    fotoPrincipal: 'testefoto3',
  },
  {
    _id: '58694a0f-3gd1-474w-bd96-145571e29d72',
    descricao: 'Fourth Item',
    fotoPrincipal: 'testefoto4',
  },
  {
    _id: '58dwdwa0f-3da1-471f-bd96-145571e29d72',
    descricao: 'Fifth Item',
    fotoPrincipal: 'testefoto5',
  },
];

class ListaServico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listServicosMaisProximos: DATA,
    };
  }

  componentDidMount() {
    // this._setLists();
  }

  _setLists = async () => {
    _setListGeoLocation();
    _setListAccess();
    this.setState({
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

  render() {
    return (
        <View style={styles.contentServicosProximos}>
          <Text>Serviços Realizados</Text>
          <View style={{...styles.containerFlatListProximo, backgroundColor: '#fff'}}>
            <FlatList
              style={styles.padraoFLatList}

              ListEmptyComponent={() => (
                <View style={styles.contentFlatListEmpty}>
                  <Text>Nenhum encontrado...</Text>
                </View>
              )}
              data={this.state.listServicosMaisProximos}
              keyExtractor={(item, index) => item._id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{...styles.touchableServicoBig,  
                    marginLeft: 5,
                    marginBottom: 5,
                    marginTop: 5,
                    backgroundColor: '#e6e6e6',
                    borderColor: '#807e7e',
                    borderWidth: 2,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('Pagamento');
                  }}>
                  <View style={styles.dadosServicoBig}>
                    <Image
                      source={{uri: BASEURL + item.fotoPrincipal}}
                      style={styles.imageServicoBig}
                    />
                    <View style={styles.descricaoServicoBig}>
                      <Text
                        numberOfLines={4}
                        style={styles.descricaoServicoBig}>
                        {item.descricao}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListaServico);
