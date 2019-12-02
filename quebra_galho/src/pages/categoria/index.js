import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    Button,
    TouchableOpacity,
    Image,
  } from 'react-native';
  
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

class Categoria extends Component {


    render(){
        return(
            <View>
                <View>

                </View>
                <View style={styles.contentServicosProximos}>
                    <Text style={textHomeStyle.service}>Serviços próximos de você</Text>
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
                            renderItem={({item, index}) => (
                                <TouchableOpacity
                                    style={styles.touchableServicoBig}
                                    onPress={() => {
                                        console.warn('essa foi');
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
            </View>
        );
    }

}