import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Footer } from 'native-base';
import { Text, } from 'react-native';

import Background from '../../common/Background';
import {DARK_BLUE_COLOR} from '../../../../res/style';
import AuthForm from '../form/AuthForm';

export default class LoginScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  getStyles = () => ({
    content: {
      // justifyContent: 'space-between',
      // padding: 8,
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
    const styles = this.getStyles();

    return (
      <Background>
        <Container>
          <Content contentContainerStyle={styles.content}>
            <AuthForm
              navigation={this.props.navigation}
            />
          </Content>
          <Footer style={{backgroundColor: 'rgba(17,49,85,0.85)', justifyContent: 'center', height: 30}}>
              <Text style={{color: 'white', textAlign: 'center', fontSize: 12}}>Inspired by JepRia.org</Text>
          </Footer>
        </Container>
      </Background>
    );
  }
}
