import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';
import { Container, Content, Header, Body, Title, Button, Left, Icon, Right, Toast } from 'native-base';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

import ViewDetail from '../form/ViewDetail';
import withBackButton from '../../../components/common/hoc/withBackButton';
import {setActiveTask} from '../../../redux/tasks/taskActions';
import { deleteTask, findTasks } from '../../../redux/tasks/taskMiddleware';
import Background from '../../../components/common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import { LoadingPanel } from '../../common/LoadingPanel';
import getStyles from '../../../../res/styles'

const mapDispatchToProps = dispatch => ({
  deleteTask: (values) => {return dispatch(deleteTask(values))},
  setActiveTask: (task) => dispatch(setActiveTask(task)),
  findTasks: (filter) => dispatch(findTasks(filter))
});

const mapStateToProps = (state) => {
  return {
    task: state.tasks.activeItem,
    filter: state.tasks.filter,
    isLoading: state.tasks.isDeleting,
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withBackButton(),
  pure,
);

@enhance
export default class DetailScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  defaultStyles = {
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
  customStyles = getStyles('FormScreen');

  removeTask = () => {
    this.props.deleteTask({
          id: this.props.task.id,
        })
      .then(() => {
        this.props.findTasks(this.props.filter);
        Toast.show({
          text: "Запись успешно удалена",
          type: 'success',
          buttonText: 'OK',
          duration: 5000
        });
        this.props.navigation.goBack(null);
      })
      .catch((err) => {
        Toast.show({
          text: err.message,
          type: 'danger',
          buttonText: 'OK',
          duration: 5000
        });
        console.log(err);
      });
  };

  goBack = () => this.props.navigation.goBack(null);

  goToUpdateTask = () => {
    const task = this.props.task;
    console.log(`goToUpdateTask(${task})`);
    this.props.navigation.navigate('EditTask');
  };

  render() {
    const task = this.props.task;
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
              <Title style={styles.title}>Задача</Title>
            </Body>
            <Right>
              <Button
                onPress={() => {
                  this.removeTask(task);
                }}
                transparent
              >
                <Icon name="trash" style={styles.icon} />
              </Button>
            </Right>
          </Header>
          <Content contentContainerStyle={styles.content}>
            <ViewDetail
              navigation={this.props.navigation}
              task={task}
            />
          </Content>
          <View>
            <TouchableHighlight
              style={styles.button}
              underlayColor={DARK_AQUA_GREEN_COLOR}
              onPress={this.goToUpdateTask}
            >
              <Icon name="md-create" style={styles.buttonIcon} />
            </TouchableHighlight>
          </View>
        </Container>
        <LoadingPanel show={this.props.isLoading} text="Удаление записи"/>
      </Background>
    );
  }
}
