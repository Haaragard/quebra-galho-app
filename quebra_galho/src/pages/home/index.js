import React, {Component} from 'react';
import {View, ScrollView, Text, Button} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../store/actions/user';

import api from '../../api';

import {styles} from '../../styles/DefaultStyles';

const users = [
  {
    auth: true,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWRhZjY2YzViZDViYTQ0NWMwNjgxODNjIiwiaWF0IjoxNTcxNzc2MjQzfQ.tOuo8MV-v5yI21BA_K-bqykdASGTM1z7H08zipxEtQ4',
  },
  {
    auth: false,
    token: {},
  },
];

class Home extends Component {
  render() {
    return (
      <ScrollView style={styles.content}>
        <View tyle={styles.appHeader}></View>
        <View>
          <Text>{JSON.stringify(this.props.user)}</Text>
          <View style={{margin: 20}}>
            <Button
              title="user1"
              onPress={() => this.props.toggleStatusUser(users[0])}
            />
          </View>
          <View style={{margin: 20}}>
            <Button
              title="SAIR"
              onPress={() => this.props.toggleStatusUser(users[1])}
            />
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
