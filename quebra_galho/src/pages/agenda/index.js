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



import {styles, formStyles, stylesMenu} from '../../styles/DefaultStyles';

const DATA = [
  {
    _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    descricao: 'First Item',
  },
  {
    _id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    descricao: 'Second Item',

  },
  {
    _id: '58694a0f-3da1-47df-bdgs6-1gsgs1e29d72',
    descricao: 'Third Item',
 
  },
  {
    _id: '58694a0f-3gd1-474w-bd96-145571e29d72',
    descricao: 'Fourth Item',
  
  },
  {
    _id: '58dwdwa0f-3da1-471f-bd96-145571e29d72',
    descricao: 'Fifth Item',
   
  },
];

class Agenda extends Component {
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
          <Text>Serviços Contratados</Text>
          <View style={styles.containerFlatListProximo}>
            <FlatList
              style={styles.padraoFLatList}
              ItemSeparatorComponent={() => (
                  <View style={styles.separatorDown} />)}
                                                          
              ListEmptyComponent={() => (
                <View style={styles.contentFlatListEmpty}>
                  <Text>Nenhum encontrado...</Text>
                </View>
              )}
              data={this.state.listServicosMaisProximos}
              keyExtractor={(item, index) => item._id}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.touchableServicoBig}
                  onPress={() => {
                    // this.props.navigation.navigate('Agenda');
                  }}>
                  <View style={styles.descricaoServicoBig}>
                    <View style={styles.descricaoServicoBig}>
                      <Text
                        numberOfLines={8}
                        style={styles.descricaoAgenda}>
                        {item.descricao}
                      </Text>
                    </View>
                    <View style={styles.descricaoServicoSmall}>
                      <Text style={styles.descricaoAgenda}>
                        Agendado para: 
                      </Text>
                    </View>
                    <View style={styles.descricaoServicoSmall}>
                      <Text style={styles.descricaoAgenda}>
                        Horário:  
                      </Text>
                    </View>
                    <View style={styles.descricaoServicoSmall}>
                      <Text style={styles.descricaoAgenda}>
                        Local: 
                      </Text>
                    </View>
                  </View>
                    <View style={formStyles.btCancel}>
                      <View style={formStyles.btCancel}>
                        <Button title="Cancelar" onPress={() => {console.warn('cancelou')}} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
