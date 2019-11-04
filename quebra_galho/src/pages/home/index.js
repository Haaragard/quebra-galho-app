import React, {Component} from 'react';

import {
  View,
  ScrollView,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../store/actions/user';

import api from '../../api';

import {styles} from '../../styles/DefaultStyles';

class Home extends Component {
  static navigationOptions = {
    // header: true,
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <View style={styles.content}>
        <View tyle={styles.appHeader}>
          <Text>HERDER -> ver isso dps</Text>
        </View>
        <View style={styles.contentServicosMaisAcessado}>
          <Text>Serviços mais procurados</Text>
          <ScrollView contentContainerStyle={styles.scrollServicosMaisAcessado}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: 300,
                backgroundColor: '#A3A3A3',
                flexDirection: 'row',
              }}>
              <View style={{flex: 1, flexDirection: 'row', margin: 10}}>
                <View style={{flex: 1}}>
                  <Image />
                </View>
                <View style={{flex: 1}}>
                  <Text>Descriçao</Text>
                </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.contentServicosProximos}>
          <Text>Serviços próximos de você</Text>
          <ScrollView contentContainerStyle={styles.scrollServicosMaisAcessado}>
            <View>
              <Text>{JSON.stringify(this.props.user)}</Text>
            </View>
            <View style={{marginTop: 50}}>
              <Button
                title="MinhaConta"
                onPress={() => this.props.navigation.navigate('MinhaConta')}
              />
            </View>
            <View style={{marginTop: 50}}>
              <Button
                title="Cadastro"
                onPress={() => this.props.navigation.navigate('Cadastro')}
              />
            </View>
            <View style={{marginTop: 50}}>
              <Button
                title="Login"
                onPress={() => this.props.navigation.navigate('Auth')}
              />
            </View>
          </ScrollView>
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
