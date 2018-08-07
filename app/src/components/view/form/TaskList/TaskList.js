import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Modal, View, ActivityIndicator, Dimensions, Text} from 'react-native';
import { Content, Toast, Icon } from 'native-base';
import compose from 'recompose/compose';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

// import withIcons from '../common/hoc/withIcons';
import {EmptyView} from '@cap-cross/cap-react-native';
import ModalWaitBar from '../../../common/WaitBar';
import TaskItem from './TaskItem';
import LoginForm from '../LoginForm';
import loginMediator from '../../../../loginMediator';
import log from '@cap-cross/cap-core';

import { findTasks } from '../../../../redux/tasks/taskMiddleware';
import { getUserData } from '../../../../redux/user/userMiddleware';
import { pure } from 'recompose';
import {LIGHT_AQUA_GREEN_COLOR} from '../../../../../res/style';

const mapStateToProps = (state) => {
  return {
    errorMessage: state.tasks.errorMessage,
    isFailed: state.tasks.isFailed,
    isLoading: state.tasks.isFetching,
    items: state.tasks.items,
    filter: state.tasks.filter,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findTasks: (filter) => dispatch(findTasks(filter)),
    getUserData: () => dispatch(getUserData()),
  };
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'loginForm' }),
  pure
);

let wasFetched = false; // Признак необходимости первоначального fetch

@enhance
export default class TaskList extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  // Для Login-диалога (Modal)
  state = {
    isLoginPending: false,
  };

  componentDidMount() {
    // Для последующего доступа из api.authenticate. TODO Переместить в более подходящее место
    //    loginMediator.dialogForm = this.modalLoginDialog;
    loginMediator.dialogForm = this;
    wasFetched = false; // TODO разобраться с времянкой!
    if (this.props.user.operatorId === '') this.props.getUserData();
    this.props.findTasks(this.props.filter);
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.props.findTasks(this.props.filter);
    }
  }

  onModalLoginClose = () => {
    // TODO Почему не вызывается ?
    //alert('Modal has been closed.'); // eslint-disable-line no-alert
  };

  setLoginPending(visible) {
    this.setState({ isLoginPending: visible });
  }

  // eslint-disable-next-line
  getStyles = props => ({
    // content: {
    //     justifyContent: 'space-between',
    //     padding: 8
    // }
  });

  loginOpen() {
    this.setLoginPending(true);
  }

  loginClose() {
    this.setLoginPending(false);
    this.props.findTasks(this.props.filter);
  }

  handleSubmit = () => this.props.handleSubmit(loginMediator.onLoginSubmit);

  renderTaskItem = ({ item }) => (
    <TaskItem
      task={item}
      navigation={this.props.navigation} // eslint-disable-line react/prop-types
      remove={() => this.props.removeTask(item.id)}
    />
  );

  render() {
    const styles = this.getStyles(this.props);

    let contentView = (
      <View style={{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',}}>
        <Icon name={'assignment'}  type="MaterialIcons" style={{ color: '#E91E63', fontSize: 60,}} />
        <Text style={{color: 'white'}}>Задач не найдено</Text>
      </View>
    );//<EmptyView text="Нет задач" />; // eslint-disable-line react/prop-types

    const items = this.props.items;

    if (this.props.isLoading) {
      contentView = (
        <View style={{
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',}}>
          <ActivityIndicator size='large' color={LIGHT_AQUA_GREEN_COLOR}/>
          <Text style={{margin: 15, textAlign: 'center', color: LIGHT_AQUA_GREEN_COLOR}}>Загрузка данных</Text>
        </View>
      );
    }

    if (this.props.isFailed) {
      contentView = (
        <View style={{
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',}}>
          <Icon name="error" type="MaterialIcons" style={{color: 'red', fontSize: 60}}/>
          <Text style={{textAlign: 'center', color: 'red'}}>{this.props.errorMessage}</Text>
        </View>
      );
    }

    if (items.length > 0) {
      contentView = (
        <FlatList
          refreshing={this.props.isLoading}
          onRefresh={() => this.props.findTasks(this.props.filter)}
          data={items}
          renderItem={this.renderTaskItem}
          keyExtractor={(item, index) => index.toString()} // TODO Проверить корректность
        />
      );
    }

    // TODO Постараться убрать отсюда(из файла) всё, что связано с Login

    const modalLoginView = (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isLoginPending}
        onRequestClose = {() => {
          this.onModalLoginClose();
        }}
        onShow = {() => {
        }}
        ref={(c) => {
          this.modalLoginDialog = c;
        }}
      >
        <LoginForm onSubmit={this.handleSubmit()} />
      </Modal>
    );

    // TODO Постараться убрать отсюда всё, что связано с Login
    const result = (
      <View style={{flex: 1}}>
        {contentView}
        {modalLoginView}
        <ModalWaitBar
          ref={(c) => {
            this.waitBar = c;
          }}
        />
      </View>
    );

    return result;
  }
}
