import React, {Component} from 'react';
import {TouchableOpacity, Text, FlatList } from 'react-native';
import { HistoricoStyles } from '../../styles/DefaultStyles';

export default class Historico extends Component{
  
  state = {
    data: [
      {
        _id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        descricao: 'First Item',
        categoria: 'First Item',
        valor: 'R$ 0,00',
        dataServiço: 'DD/MM/AAAA',
      },
      {
        _id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        descricao: 'Second Item',
        categoria: 'Second Item',
        valor: 'R$ 0,00',
        dataServiço: 'DD/MM/AAAA',        
      },
      {
        _id: '58694a0f-3da1-47df-bdgs6-1gsgs1e29d72',
        descricao: 'Third Item',
        categoria: 'Third Item',
        valor: 'R$ 0,00',
        dataServiço: 'DD/MM/AAAA',
      },
      {
        _id: '58694a0f-3gd1-474w-bd96-145571e29d72',
        descricao: 'Fourth Item',
        categoria: 'Fourth Item',
        valor: 'R$ 0,00',
        dataServiço: 'DD/MM/AAAA',
      },
      {
        _id: '58dwdwa0f-3da1-471f-bd96-145571e29d72',
        descricao: 'Fifth Item',
        categoria: 'Fifth Item',
        valor: 'R$ 0,00',
        dataServiço: 'DD/MM/AAAA',
      }, 
      {
        _id: '58dwdwa0f-3da1-471f-bd96-145571e29d73',
        descricao: 'Sixth Item',
        categoria: 'Sixth Item',
        valor: 'R$ 0,00',
        dataServiço: 'DD/MM/AAAA',
      }, 
      {
        _id: '58dwdwa0f-3da1-471f-bd96-145571e29d72',
        descricao: 'Seventh Item',
        categoria: 'Seventh Item',
        valor: 'R$ 0,00',
        dataServiço: 'DD/MM/AAAA',
      },      
    ],
  };

  renderItem = ({ item }) => (    
    <TouchableOpacity style={HistoricoStyles.postContainer} >
      <Text style={HistoricoStyles.postTitle}>{item.categoria}</Text>
      <Text style={HistoricoStyles.postDescription}>Valor: {item.valor}</Text>
      <Text style={HistoricoStyles.postDescription}>Data: {item.dataServiço}</Text>
    </TouchableOpacity>
    
  );

  render() {
    return(
    
      <FlatList style={HistoricoStyles.container}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={
          emptyList = ({ item }) => (      
            <Text style={{textAlign: 'center', marginTop: '50%'}}>Nenhum serviço realizado!</Text>    
          )}
      />
 

    );
  }

}