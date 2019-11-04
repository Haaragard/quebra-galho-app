import React, {Component} from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import {stylesMenu} from '../styles/DefaultStyles';

import DrawerContent from './drawer';

import LoadingScreen from '../pages/LoadingScreen';

import Login from '../pages/login';
import Cadastro from '../pages/cadastro';

import Home from '../pages/home';
import DivulgarServico from '../pages/divulgarServico';
import MinhaConta from '../pages/user';

export default class Routes extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createDrawerNavigator(
  {
    Home: {screen: Home},
    MinhaConta: {screen: MinhaConta},
  },
  {
    initialRouteName: 'Home',
    contentComponent: DrawerContent,
    drawerPosition: 'left',
    drawerType: 'front',
  },
);

const LoadingScreenStack = createStackNavigator(
  {
    LoadingScreen: {screen: LoadingScreen},
  },
  {initialRouteName: 'LoadingScreen'},
);

const AuthStack = createStackNavigator(
  {
    Login: {screen: Login},
    Cadastro: {screen: Cadastro},
  },
  {
    initialRouteName: 'Login',
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: AppNavigator,
      Auth: AuthStack,
      LoadingScreen: LoadingScreenStack,
      DivulgarServico: DivulgarServico,
    },
    {
      initialRouteName: 'LoadingScreen',
    },
  ),
);
