import React, {Component} from 'react';

import {View, ScrollView, Text, Button} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as UserActions from '../../store/actions/user';

import api from '../../api';

import {styles} from '../../styles/DefaultStyles';

class Home extends Component {
  render() {
    return (
      <ScrollView style={styles.content}>
        <View tyle={styles.appHeader}></View>
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
