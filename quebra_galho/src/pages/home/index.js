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

import api from '../../api';

import {styles, stylesMenu} from '../../styles/DefaultStyles';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

class Home extends Component {
  // static navigationOptions = {
  //   headerBackTitle: 'bacon',
  //   title: 'Home',
  //   headerStyle: {
  //     backgroundColor: stylesMenu.backgroundColor,
  //   },
  //   headerTintColor: '#fff',
  //   headerTitleStyle: {
  //     fontWeight: 'bold',
  //   },
  // };

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.contentServicosMaisAcessado}>
          <Text>Serviços mais procurados</Text>
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
              data={DATA}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.touchableServicoSmall}
                  onPress={() => {
                    console.warn('essa foi');
                  }}>
                  <View style={styles.dadosServicoSmall}>
                    <Image style={styles.imageServicoSmall} />
                    <View style={styles.descricaoServicoSmall}>
                      <Text numberOfLines={4}>{item.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View style={styles.contentServicosProximos}>
          <Text>Serviços próximos de você</Text>
          <View style={styles.containerFlatListProximo}>
            <FlatList
              style={{flex: 1, flexDirection: 'column'}}
              data={DATA}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 200,
                    backgroundColor: '#A3A3A3',
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Text>Bacon</Text>
                  </View>
                </TouchableOpacity>
                // <TouchableOpacity
                //   style={{
                //     height: '100%',
                //     width: 300,
                //     backgroundColor: '#A3A3A3',
                //     flexDirection: 'row',
                //   }}>
                //   <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
                //     <View style={{flex: 1}}>
                //       <Image />
                //     </View>
                //     <View style={{flex: 1}}>
                //       <Text>Descriçao</Text>
                //     </View>
                //   </View>
                // </TouchableOpacity>
              )}
            />
          </View>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
