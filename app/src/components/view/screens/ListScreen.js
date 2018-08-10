import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Container, Header, Left, Right, Title, Button, Body, Icon } from 'native-base';
import bindActionCreators from 'redux/lib/bindActionCreators';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import log from '@cap-cross/cap-core';

import withBackButton from '../../common/hoc/withBackButton';
import FloatingActionButton from '../../common/FloatingActionButton';
import TaskList from '../form/TaskList/TaskList';
import * as TaskActions from '../../../redux/tasks/taskActions';
import {Util} from '@cap-cross/cap-react-native';
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
  };
  customStyles = getStyles('ListScreen');

  addTask = () => {
    this.props.navigation.navigate('AddTask');
  };

  filterTasks = () => {
    log.trace('ListScreen.filterTasks()');
    this.props.navigation.navigate('FilterTasks');
  };

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;

    const addTaskButton = ( // For iOS
      <Right>
        <Button onPress={this.addTask} transparent>
          <Icon name="add" size={30} color="#FFFFFF" />
        </Button>
      </Right>
    );

    const title = 'Задачи'; // eslint-disable-line react/prop-types

    return (
      <Background>
        <Container>
          <Header style={styles.header}>
            {Util.platformOS() === 'ios' && <Left />}
            {Util.platformOS() === 'ios' && (
              <Body>
                <Text>TODO title</Text>
              </Body>
            )}
            {Util.platformOS() === 'ios' && addTaskButton}
            {Util.platformOS() === 'android' && (
            <Left>
              <Button onPress={() => this.props.navigation.openDrawer()} transparent>
                <Icon name="menu" style={styles.icon} />
              </Button>
              </Left>
            )}
            <Body>
              <Title style={styles.title}>{title}</Title>
            </Body>

            {Util.platformOS() === 'android' && (
              <Right>
                <Button onPress={this.filterTasks} transparent>
                  <Icon name="search" style={styles.icon} />
                </Button>
              </Right>
            )}
          </Header>
          <TaskList
            navigation={this.props.navigation}
            items={this.props.items}
            receiveTasks={this.props.actions.receiveTasks}
          />
          {Util.platformOS() === 'android' && (
            <FloatingActionButton
              iconName="add"
              mainButton={{
                onPress: this.addTask,
                title: 'Задача',
              }}
              subButton1={{
                onPress: this.addTask,
                title: 'Регистрация ошибки',
              }}
              subButton2={{
                onPress: this.addTask,
                title: 'Запрос функционала',
              }}
            />
          )}
        </Container>
      </Background>
    );
  }
}
