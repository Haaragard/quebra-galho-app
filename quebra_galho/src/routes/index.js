import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Icon from 'react-native-vector-icons/Entypo';
import DrawerContent from './drawer';

import LoadingScreen from '../pages/LoadingScreen';

import Login from '../pages/login';
import Cadastro from '../pages/cadastro';

import Home from '../pages/home';
import DivulgarServico from '../pages/servico/Cadastro';
import MinhaConta from '../pages/user';
import {stylesMenu} from '../styles/DefaultStyles';

// import {LocaleConfig} from 'react-native-calendars';
// LocaleConfig.locales['pt-br'] = {
//   monthNames: [
//     'Janeiro',
//     'Fevereiro',
//     'Março',
//     'Abril',
//     'Maio',
//     'Junho',
//     'Julho',
//     'Agosto',
//     'Setembro',
//     'Outubro',
//     'Novembro',
//     'Dezembro',
//   ],
//   monthNamesShort: [
//     'Jan.',
//     'Fev.',
//     'Mar.',
//     'Abr.',
//     'Mai.',
//     'Jun.',
//     'Jul.',
//     'Ago.',
//     'Set.',
//     'Out.',
//     'Nov.',
//     'Dez.',
//   ],
//   dayNames: [
//     'Domingo',
//     'Segunda',
//     'Terça',
//     'Quarta',
//     'Quinta',
//     'Sexta',
//     'Sábado',
//   ],
//   dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
//   today: ['Hoje'],
// };

// LocaleConfig.defaultLocale = 'pt-br';

export default class Routes extends Component {
  render() {
    return <AppContainer />;
  }
}

const DrawerIcon = props => (
  <View>
    <TouchableOpacity
      onPress={() => {
        props.navigation.openDrawer();
      }}>
      <Icon
        name="menu"
        style={{color: 'white', marginLeft: 10, fontSize: 30}}
      />
    </TouchableOpacity>
  </View>
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        title: 'Home',
      }),
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      initialRouteName: 'Home',
      headerLeft: <DrawerIcon navigation={navigation} />,
      headerStyle: {
        backgroundColor: stylesMenu.backgroundColor,
      },
    }),
  },
);

const MinhaContaStack = createStackNavigator(
  {
    MinhaConta: {
      screen: MinhaConta,
      navigationOptions: ({navigation}) => ({
        title: 'Minha conta',
      }),
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      initialRouteName: 'MinhaConta',
    }),
  },
);

const AppNavigator = createDrawerNavigator(
  {
    Home: {screen: HomeStack},
    MinhaConta: {screen: MinhaContaStack},
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
