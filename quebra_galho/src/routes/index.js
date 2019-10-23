import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createDrawerNavigator,
} from 'react-navigation-drawer';

import {stylesMenu} from '../styles/DefaultStyles';

import DrawerContent from './drawer';

import Home from '../pages/home';
import Cadastro from '../pages/cadastro';
import Login from '../pages/login';
import LoadingScreen from '../pages/LoadingScreen';

export default class Routes extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createDrawerNavigator(
  {
    Home: {screen: Home},
  },
  {
    initialRouteName: 'Home',
    contentComponent: DrawerContent,
    drawerPosition: 'left',
    drawerType: 'front',
  },
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
      LoadingScreen: LoadingScreen,
      App: AppNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'App',
    },
  ),
);
