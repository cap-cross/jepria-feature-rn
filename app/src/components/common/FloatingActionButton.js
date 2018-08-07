import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import {DARK_AQUA_GREEN_COLOR} from '../../../res/style'

export default class FloatingActionButton extends React.Component {
  static propTypes = {
    mainButton: PropTypes.object,
    subButton1: PropTypes.object,
    subButton2: PropTypes.object,
  };

  getStyles = () =>
    StyleSheet.create({
      actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
    });

  render() {
    const styles = this.getStyles(this.props);
    return (
      <ActionButton buttonColor={DARK_AQUA_GREEN_COLOR}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title={this.props.mainButton.title}
          onPress={() => {
            this.props.mainButton.onPress();
          }}
        >
          <Icon name="md-add" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title={this.props.subButton1.title}
          onPress={() => {
            this.props.subButton1.onPress();
          }}
        >
          <Icon name="md-bug" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title={this.props.subButton2.title}
          onPress={() => {
            this.props.subButton2.onPress();
          }}
        >
          <Icon name="md-construct" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
}
