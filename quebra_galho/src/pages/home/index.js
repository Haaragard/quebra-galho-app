import React, {Component} from 'react';
import {View, ScrollView, Text, Button} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../store/actions/user';

import api from '../../api';

import {styles} from '../../styles/DefaultStyles';

const users = [
  {
    id: 1,
    nome: 'Diogo Borges Antunes',
    email: 'diogololz159@gmail.com',
    cpf: '078.313.279-40',
    servicos: [
      {id: 1, nome: 'Pedreiro'},
      {id: 2, nome: 'Padeiro'},
      {id: 3, nome: 'Confeteiro'},
      {id: 4, nome: 'Programador'},
      {id: 5, nome: 'Engenheiro'},
    ],
  },
  {
    id: 2,
    nome: 'Klaiton',
    email: 'diogololz159@gmail.com',
    cpf: '123.323.279-31',
    servicos: [
      {id: 1, nome: 'Pedreiro'},
      {id: 2, nome: 'Padeiro'},
      {id: 3, nome: 'Confeteiro'},
      {id: 4, nome: 'Programador'},
      {id: 5, nome: 'Engenheiro'},
    ],
  },
  {
    id: 3,
    nome: 'Gustavo',
    email: 'diogololz159@gmail.com',
    cpf: '444.233.222-40',
    servicos: [
      {id: 1, nome: 'Pedreiro'},
      {id: 2, nome: 'Padeiro'},
      {id: 3, nome: 'Confeteiro'},
      {id: 4, nome: 'Programador'},
      {id: 5, nome: 'Engenheiro'},
    ],
  },
  {
    id: 4,
    nome: 'Rafael',
    email: 'diogololz159@gmail.com',
    cpf: '078.242.144-15',
    servicos: [
      {id: 1, nome: 'Pedreiro'},
      {id: 2, nome: 'Padeiro'},
      {id: 3, nome: 'Confeteiro'},
      {id: 4, nome: 'Programador'},
      {id: 5, nome: 'Engenheiro'},
    ],
  },
  {},
];

const Home = ({user, toggleUser}) => (
  <ScrollView style={styles.content}>
    <View tyle={styles.appHeader}></View>
    <View>
      <Text>{JSON.stringify(user)}</Text>
      <View style={{margin: 20}}>
        <Button title="user1" onPress={() => toggleUser(users[0])} />
      </View>
      <View style={{margin: 20}}>
        <Button title="user2" onPress={() => toggleUser(users[1])} />
      </View>
      <View style={{margin: 20}}>
        <Button title="user3" onPress={() => toggleUser(users[2])} />
      </View>
      <View style={{margin: 20}}>
        <Button title="user4" onPress={() => toggleUser(users[3])} />
      </View>
      <View style={{margin: 20}}>
        <Button title="SAIR" onPress={() => toggleUser(users[4])} />
      </View>
    </View>
    {/* <Button
      title="Login"
      onPress={() => this.props.navigation.navigate('Login')}
    />
    <Button
      title="Cadastro"
      onPress={() => this.props.navigation.navigate('Cadastro')}
    /> */}
    {/* <View style={{ marginTop: 50, marginBottom: 50, }}>
            <Button
                title = 'ATT API'
                // onPress = {this.clickAttApi}
            />
        </View> */}
    {/* <Button
            title = 'Login'
            // onPress = {() => this.props.navigation.navigate('Auth')}
        /> */}
  </ScrollView>
);

// class Home extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             usuarios: {},
//         }
//     }

//     static navigationOptions = {
//         title: 'Home',
//     };

//     componentDidMount() {
//         this.clickAttApi();
//     }

//     clickAttApi = () => {
//         api.get('/usuarios')
//         .then(u => { this.setState({ usuarios: u.data.docs }) })
//         .catch(v => {
//             return { error: 'ocorreu um erro'}
//         });
//     }

//     render() {
//         return (
//             <ScrollView style={styles.content}>
//                 <View tyle={styles.appHeader}>
//                 </View>
//                 <View>
//                     {/* {this.state.usuarios.map(usuario => {
//                         <View key={usuario._id}>
//                             <Text>{JSON.stringify(usuario)}</Text>
//                         </View>
//                     })} */}
//                     <Text>{JSON.stringify(this.state.usuarios)}</Text>
//                 </View>
//                 {/* <Button
//                     title = 'Login'
//                     onPress = {() => this.props.navigation.navigate('Login')}
//                 />
//                 <Button
//                     title = 'Cadastro'
//                     onPress = {() => this.props.navigation.navigate('Cadastro')}
//                 /> */}
//                 <View style={{ marginTop: 50, marginBottom: 50, }}>
//                     <Button
//                         title = 'ATT API'
//                         onPress = {this.clickAttApi}
//                     />
//                 </View>
//                 <Button
//                     title = 'Login'
//                     onPress = {() => this.props.navigation.navigate('Auth')}
//                 />
//             </ScrollView>
//         )
//     }
// }

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
