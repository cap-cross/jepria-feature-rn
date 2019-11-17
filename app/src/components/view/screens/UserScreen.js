import React from 'react';
import PropTypes from 'prop-types';
import { Content, Button, Icon, Toast } from 'native-base';
import connect from 'react-redux/lib/connect/connect';
import { compose, hoistStatics, pure} from 'recompose';

import UserDetail from '../form/UserDetail';
import { logout } from '../../../redux/user/userMiddleware';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR} from '../../../../res/style';

class UserScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => (
        <Button onPress={() => navigation.openDrawer()} transparent>
          <Icon name="menu" style={screenStyles.icon} />
        </Button>
      )
    }
  };

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

  logout = () => {
    this.props.logout()
      .then((response) => {
        this.props.navigation.navigate('Home');
      })
      .catch((err) => {
        Toast.show({
          text: err.message,
          type: 'danger',
          buttonText: 'OK',
          duration: 5000
        });
      });
  };

  render() {
    const { user } = this.props;
    const styles = this.getStyles();

    return (
      <Background>
          <Content contentContainerStyle={styles.content}>
            <UserDetail
              navigation={this.props.navigation}
              user={user}
            />
          </Content>
      </Background>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => {return dispatch(logout())}
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  pure,
);

export default hoistStatics(enhance)(UserScreen);