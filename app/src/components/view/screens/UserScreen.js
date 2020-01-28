import React from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import UserDetail from '../form/UserDetail';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR} from '../../../../res/style';
import { SecurityContext } from '../../../context/SecurityContext';

class UserScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    const handleLogout  = navigation.getParam("handleLogout");
    return {
      headerLeft: () => (
        <TouchableOpacity style={{margin: 20}} onPress={() => {navigation.openDrawer()}} transparent>
          <Ionicons name="md-menu" style={screenStyles.icon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity style={{margin: 20}} onPress={() => {handleLogout()}} transparent>
          <Ionicons name="md-exit" style={screenStyles.icon} />
        </TouchableOpacity>
      ),
    }
  };

  static contextType = SecurityContext;

  componentDidMount() {
    this.props.navigation.setParams({
      handleLogout: this.handleLogout
    });
  }

  handleLogout = () => {
    this.context.logout();
    this.props.navigation.navigate("Auth");
  }

  getStyles = () => ({
    content: {
      justifyContent: 'space-between',
      padding: 8,
    },
    inputGroup: {
      flex: 0.9,
    },
    header: {
      backgroundColor: DARK_BLUE_COLOR,
    },
    title: {
      color: '#FFFFFF',
    },
    icon: {
      color: '#FFFFFF',
      fontSize: 30,
    },
  });

  render() {

    return (
      <Background>
         <UserDetail
            navigation={this.props.navigation}
            user={this.context.user}
         />
      </Background>
    );
  }
}

export default UserScreen;