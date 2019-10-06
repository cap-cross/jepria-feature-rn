import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';
import { Container, Content, Header, Body, Title, Button, Left, Icon, Right, Toast } from 'native-base';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

import { reduxForm } from 'redux-form';

import withBackButton from '../../../components/common/hoc/withBackButton';

import {setActiveTask} from '../../../redux/tasks/taskActions';
import { createTask, findTasks } from '../../../redux/tasks/taskMiddleware';
import AddForm from '../form/AddForm';
import Background from '../../../components/common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import { LoadingPanel } from '../../common/LoadingPanel';
import getStyles from '../../../../res/styles'

const mapDispatchToProps = dispatch => ({
  createTask: (values) => {return dispatch(createTask(values))},
  setActiveTask: (task) => dispatch(setActiveTask(task)),
  findTasks: (filter) => dispatch(findTasks(filter))
});

const mapStateToProps = (state) => {
  return {
    filter: state.tasks.filter,
    isLoading: state.tasks.isCreating,
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'addForm' }),
  withBackButton(),
  pure,
);

@enhance
export default class AddScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
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

  goBack = () => this.props.navigation.goBack();

  handleSubmit = () => this.props.handleSubmit(this.submitTask);

  submitTask = (values) => {
    console.log(`AddScreen.submitTask(): values = ${JSON.stringify(values)}`);
    this.props.createTask({
      name: values.name,
      nameEn: values.nameEn,
      description: values.description,
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
      console.log(err.message);
      Toast.show({
        text: err.message,
        type: 'danger',
        buttonText: 'OK',
        duration: 5000
      });
    });

    console.log('AddScreen.submitTask(): AFTER this.props.dispatch');

    // this.props.navigation.goBack();
  };

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
              <Title style={styles.title}>Создание</Title>
            </Body>
            <Right />
          </Header>
          <Content contentContainerStyle={styles.content}>
            <AddForm />
          </Content>
          <View>
            <TouchableHighlight
              style={styles.button}
              underlayColor={DARK_AQUA_GREEN_COLOR}
              onPress={this.handleSubmit}
            >
              <Icon name="md-checkmark" style={styles.buttonIcon} />
            </TouchableHighlight>
          </View>
        </Container>
        <LoadingPanel show={this.props.isLoading} text="Создание записи"/>
      </Background>
    );
  }
}
