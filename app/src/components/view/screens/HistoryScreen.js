import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Header, Body, Title, Button, Left, Icon, Right, Toast } from 'native-base';
import bindActionCreators from 'redux/lib/bindActionCreators';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

import { reduxForm } from 'redux-form';

import withBackButton from '../../common/hoc/withBackButton';
import Util from '@cap-cross/cap-react-native';
import HistoryList from '../form/HistoryList';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR} from '../../../../res/style';
import getStyles from '../../../../res/styles'

const enhance = compose(
  withBackButton(),
  pure,
);

@enhance
export default class HistoryScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  defaultStyles = {
    header: {
      backgroundColor: DARK_BLUE_COLOR,
    },
    title: {
      color: '#FFFFFF',
    },
    icon: {
      fontSize: 30,
    }
  };
  customStyles = getStyles('HistoryScreen');
  
  goBack = () => this.props.navigation.goBack();

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;

    return (
      <Background>
        <Container>
          <Header style={styles.header}>
            <Left>
              <Button onPress={this.goBack} transparent>
                <Icon name="arrow-back" style={styles.icon} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>Cтатус</Title>
            </Body>
            <Right />
          </Header>
          <Content contentContainerStyle={styles.content}>
            <HistoryList/>
          </Content>
        </Container>
      </Background>
    );
  }
}
