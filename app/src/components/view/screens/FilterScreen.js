import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';
import { Container, Content, Header, Body, Title, Button, Left, Icon, Right } from 'native-base';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

import { reduxForm } from 'redux-form';
import withBackButton from '../../common/hoc/withBackButton';
import { findTasks } from '../../../redux/tasks/taskMiddleware';
import FilterForm from '../form/FilterForm';
import ModalWaitBar from '../../common/WaitBar';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import getStyles from '../../../../res/styles'

const mapStateToProps = (state) => {
  return {
  initialValues: {
    ...state.tasks.filter,
    statusCodeList: state.tasks.filter.statusCodeList ? state.tasks.filter.statusCodeList.slice() : []
  }
}};

const mapDispatchToProps = (dispatch) => {
  return {
    findTasks: (filter) => dispatch(findTasks(filter)),
  };
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'filterForm',
  }),
  withBackButton(),
  pure,
);

@enhance
export default class FilterScreen extends React.Component {
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
  
  handleSubmit = () => this.props.handleSubmit(this.submitTask);

  submitTask = (values) => {
    console.log(`FilterScreen.submitTask(${JSON.stringify(values)})`);
    this.props.findTasks({
      id: values.id,
      authorId: values.authorId,
      name: values.name,
      nameEn: values.nameEn,
      statusCodeList: values.statusCodeList,
      responsibleId: values.responsibleId,
    });
    this.props.navigation.goBack();
  };

  render() {
    let styles = this.customStyles !== undefined ? this.customStyles : this.defaultStyles;

    return (
      <Background>
        <Container style={{backgroundColor:'transparent'}}>
          <Header style={styles.header}>
            <Left>
              <Button onPress={() => this.props.navigation.goBack()} transparent>
                <Icon name="arrow-back" style={styles.icon} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>Фильтр</Title>
            </Body>
            <Right />
          </Header>
          <Content contentContainerStyle={styles.content}>
            <FilterForm/>
            <ModalWaitBar
              ref={(c) => {
                this.waitBar = c;
              }}
            />
          </Content>
          <View>
            <TouchableHighlight
              style={styles.button}
              underlayColor="red"
              onPress={this.handleSubmit()}
            >
              <Icon name="md-checkmark" style={styles.buttonIcon} />
            </TouchableHighlight>
          </View>
        </Container>
      </Background>
    );
  }
}
