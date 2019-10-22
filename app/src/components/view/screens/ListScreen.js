import React from 'react';
import {View, TouchableHighlight} from 'react-native'
import { Container, Header, Left, Right, Title, Button, Body, Icon } from 'native-base';
import withBackButton from '../../common/hoc/withBackButton';
import FeatureList from '../form/list/FeatureList';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import getStyles from '../../../../res/styles'

class ListScreen extends React.Component {

  defaultStyles = {
    header: {
      backgroundColor: DARK_BLUE_COLOR,
    },
    title: {
      color: '#FFFFFF',
      width: 150,
      fontSize: 20,
    },
    icon: {
      color: '#FFFFFF',
      fontSize: 30,
    },   
    button: {
      backgroundColor: DARK_AQUA_GREEN_COLOR,
      height: 56,
      width: 56,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 30,
      right: 30,
      shadowColor: '#000000',
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 0,
      },
    },
    buttonIcon: {
      color: 'white',
    },
  };
  customStyles = getStyles('ListScreen');

  AddFeature = () => {
    this.props.navigation.navigate('AddFeature');
  };

  FilterFeature = () => {
    this.props.navigation.navigate('FilterFeature');
  };

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    const title = 'Задачи';

    return (
      <Background>
        <Container style={{backgroundColor:'transparent'}}>
          <Header style={styles.header}>
            <Left>
              <Button onPress={() => this.props.navigation.openDrawer()} transparent>
                <Icon name="menu" style={styles.icon} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>{title}</Title>
            </Body>
            <Right>
              <Button onPress={this.FilterFeature} transparent>
                <Icon name="search" style={styles.icon} />
              </Button>
            </Right>
          </Header>
          <FeatureList
            navigation={this.props.navigation}
          />
          <View>
            <TouchableHighlight
              style={styles.button}
              underlayColor="red"
              onPress={this.AddFeature}
            >
              <Icon name="ios-add" style={styles.buttonIcon} />
            </TouchableHighlight>
          </View>
        </Container>
      </Background>
    );
  }
}

export default withBackButton()(ListScreen)