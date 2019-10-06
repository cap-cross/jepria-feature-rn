import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Header, Body, Title, Button, Left, Icon, Right } from 'native-base';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

import withBackButton from '../../common/hoc/withBackButton';
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
  customStyles = getStyles('Screen');
  
  goBack = () => this.props.navigation.goBack();

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;

    return (
      <Background>
        <Container style={{backgroundColor:'transparent'}}>
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
