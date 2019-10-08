import { createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator} from 'react-navigation-drawer';
import { createStackNavigator} from 'react-navigation-stack';
import {
  createReduxContainer,
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
import LoginScreen from '../components/view/screens/LoginScreen';
import AuthLoadingScreen from '../components/view/screens/AuthLoadingScreen';
import VerificationScreen from '../components/view/screens/VerificationScreen';
import {DARK_BLUE_COLOR} from '../../res/style';

const mapStateToProps = state => ({
  state: state.navigate,
});

const middleware = createReactNavigationReduxMiddleware(
  state => state.navigate
);

// const EditStack = createStackNavigator(
// {
//     ViewTask: {screen: DetailScreen},
//     EditTask: {screen: EditScreen},
//     TaskHistory: {screen: HistoryScreen},
//     Home: {screen: ListScreen},
// },
// {
//    headerMode: 'none' 
// });

// const TaskNavigator = createStackNavigator(
// {
//     Home: {screen: ListScreen},
//     EditStack: {screen: EditStack},
//     AddTask: {screen: AddScreen},
//     FilterTasks: {screen: FilterScreen},
// },
// {
//   initialRouteName: 'Home',
//    headerMode: 'none' 
// });

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
  
  const TaskNavigator = createStackNavigator (
  {
      Home: {screen: ListScreen},     
      FilterTasks: {screen: FilterScreen},
      AddTask: {screen: AddScreen},
      EditTask: {screen: EditScreen},
      ViewTask: {screen: DetailScreen},
      TaskHistory: {screen: HistoryScreen},
  },
  {
    initialRouteName: 'Home',
     headerMode: 'none' 
  });

const DrawerNavigator = createDrawerNavigator(
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

const RootNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: DrawerNavigator,
    Auth: LoginScreen,
    Verify: VerificationScreen
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

const Navigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, Navigator, middleware };
