import React from 'react';
import {View, Text} from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';


import ListScreen from '../components/view/screens/ListScreen';
import AddScreen from '../components/view/screens/AddScreen';
import DetailScreen from '../components/view/screens/DetailScreen';
import EditScreen from '../components/view/screens/EditScreen';
import FilterScreen from '../components/view/screens/FilterScreen';
import HistoryScreen from '../components/view/screens/HistoryScreen';
import UserScreen from '../components/view/screens/UserScreen';
import Drawer from '../components/view/screens/DrawerScreen';
import {DARK_BLUE_COLOR} from '../../res/style';

const mapStateToProps = state => ({
  state: state.navigate,
});

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.navigate
);

const EditStack = createStackNavigator(
{
    ViewTask: {screen: DetailScreen},
    EditTask: {screen: EditScreen},
    TaskHistory: {screen: HistoryScreen},
    Home: {screen: ListScreen},
},
{
   headerMode: 'none' 
});

const TaskNavigator = createStackNavigator(
{
    Home: {screen: ListScreen},
    EditStack: {screen: EditStack},
    AddTask: {screen: AddScreen},
    FilterTasks: {screen: FilterScreen},
},
{
  initialRouteName: 'Home',
   headerMode: 'none' 
});

const draw = (props) => (
  <View style={{flex: 1, backgroundColor: 'red'}}>
   <Text style={{color: 'white'}}> TEEEST</Text>
  </View>
)

const RootNavigator = createDrawerNavigator(
{
  "Профиль": {screen: UserScreen},
  "Задачи": {screen: TaskNavigator}
},
{
  initialRouteName: 'Задачи',
  headerMode: 'none',
  contentComponent: Drawer,
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor: DARK_BLUE_COLOR,
  }
});

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const Navigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, Navigator, middleware };
