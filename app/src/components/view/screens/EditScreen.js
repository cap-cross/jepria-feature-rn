import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight, ActivityIndicator, Modal, Text } from 'react-native';
import { Container, Content, Header, Body, Title, Button, Left, Icon, Right, Toast } from 'native-base';
import bindActionCreators from 'redux/lib/bindActionCreators';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import log from '@cap-cross/cap-core';

import { reduxForm } from 'redux-form';

import withBackButton from '../../../components/common/hoc/withBackButton';
import EditForm from '../form/EditForm';
import {setActiveTask} from '../../../redux/tasks/taskActions';
import { updateTask, findTasks } from '../../../redux/tasks/taskMiddleware';
import {Util} from '@cap-cross/cap-react-native';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR, LIGHT_AQUA_GREEN_COLOR} from '../../../../res/style';
import { LoadingPanel } from '../../common/LoadingPanel';
import getStyles from '../../../../res/styles'

const mapDispatchToProps = dispatch => ({
  updateTask: (values) => {return dispatch(updateTask(values))},
  setActiveTask: (task) => dispatch(setActiveTask(task)),
  findTasks: (filter) => dispatch(findTasks(filter))
});

const mapStateToProps = (state) => {
  return {
    initialValues: state.tasks.activeItem,
    filter: state.tasks.filter,
    isLoading: state.tasks.isUpdating,
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'editForm',
  }),
  withBackButton(),
  pure,
);

@enhance
export default class EditScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  defaultStyles = {
    content: {
      justifyContent: 'space-between',
      padding: 8,
    },
    header: {
      backgroundColor: DARK_BLUE_COLOR,
    },
    title: {
      color: '#FFFFFF',
      width: 200,
    },
    icon: {
      color: '#FFFFFF',
      fontSize: 30,
    },
    doneButton: {
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
    doneButtonIcon: {
      color: 'white',
    },
  };
  customStyles = getStyles('EditScreen');

  handleSubmit = () => this.props.handleSubmit(this.submitTask);

  goBack = () => this.props.navigation.goBack();

  submitTask = (values) => {
    log.trace(`EditScreen.submitTask(): values = ${JSON.stringify(values)}`);
    this.props.updateTask({
          id: this.props.initialValues.id,
          author: values.author,
          name: values.name,
          nameEn: values.nameEn,
          description: values.description,
          statusCode: values.statusCode,
        })
      .then((task) => {
        this.props.setActiveTask(task);
        this.props.findTasks(this.props.filter);
        Toast.show({
          text: "Изменения успешно сохранены!",
          type: 'success',
          buttonText: 'OK',
          duration: 5000
        });
        this.props.navigation.navigate('ViewTask');
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
    log.trace(`EditScreen.render(): task = ${JSON.stringify(this.props.initialValues)}`);

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
              <Title style={styles.title}>Редактирование</Title>
            </Body>
            <Right />
          </Header>
          <Content contentContainerStyle={styles.content}>
            <EditForm
            />
          </Content>
          {Util.platformOS() === 'android' && (
            <View>
              <TouchableHighlight
                style={styles.doneButton}
                underlayColor="red"
                onPress={this.handleSubmit()}
              >
                <Icon name="md-checkmark" style={styles.doneButtonIcon} />
              </TouchableHighlight>
            </View>
          )}

        </Container>
        <LoadingPanel show={this.props.isLoading} text="Обновление записи"/>
      </Background>
    );
  }
}
