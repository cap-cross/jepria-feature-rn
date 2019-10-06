import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableHighlight} from 'react-native'
import { Container, Header, Left, Right, Title, Button, Body, Icon } from 'native-base';
import {bindActionCreators} from 'redux/lib/redux';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

import withBackButton from '../../common/hoc/withBackButton';
import TaskList from '../form/TaskList/TaskList';
import * as TaskActions from '../../../redux/tasks/taskActions';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import getStyles from '../../../../res/styles'

const mapStateToProps = state => ({
  items: state.tasks.items,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TaskActions, dispatch),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withBackButton(),
  pure,
);

@enhance
export default class ListScreen extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    navigation: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
  };

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

  addTask = () => {
    this.props.navigation.navigate('AddTask');
  };

  filterTasks = () => {
    console.log('ListScreen.filterTasks()');
    this.props.navigation.navigate('FilterTasks');
  };

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;
    const title = 'Задачи'; // eslint-disable-line react/prop-types

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
              <Button onPress={this.filterTasks} transparent>
                <Icon name="search" style={styles.icon} />
              </Button>
            </Right>
          </Header>
          <TaskList
            navigation={this.props.navigation}
            items={this.props.items}
            receiveTasks={this.props.actions.receiveTasks}
          />
          <View>
            <TouchableHighlight
              style={styles.button}
              underlayColor="red"
              onPress={this.addTask}
            >
              <Icon name="ios-add" style={styles.buttonIcon} />
            </TouchableHighlight>
          </View>
        </Container>
      </Background>
    );
  }
}
