import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Body, Title, Button, Left, Icon, Right } from 'native-base';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

import withBackButton from '../../common/hoc/withBackButton';
import Background from '../../common/Background';
import {DARK_BLUE_COLOR} from '../../../../res/style';
import getStyles from '../../../../res/styles'
import ListView from '../../common/ListView'
import { findFeatureProcess } from '../../../redux/process/featureProcessMiddleware'

const mapStateToProps = (state) => {
  return {
    feature: state.feature.activeItem,
    history: state.history,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findFeatureProcess: (feature) => dispatch(findFeatureProcess(feature))
  };
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withBackButton(),
  pure,
);

const styles = {
  header: {
    backgroundColor: DARK_BLUE_COLOR,
  },
  title: {
    color: '#FFFFFF',
  },
  icon: {
    fontSize: 30,
  },
  ...getStyles('Screen'),
  ...getStyles('HistoryListItem')
};

@enhance
export default class HistoryScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.findFeatureProcess(this.props.feature);
  }
  
  goBack = () => this.props.navigation.goBack();

  render() {
    return (
      <Background>
        <ListView
          items={this.props.history.items}
          refreshing={this.props.history.isLoading}
          renderItem={
            ({item}) => {
              return (
                <View style={styles.card}>
                  <View>
                    <Text style={{...styles.text, fontWeight: 'bold', fontSize:16}}>{item.featureStatusName}</Text>
                  </View>
                  <View>
                    <Text style={{...styles.text, fontSize: 14}}>Дата изменения: {item.dateIns}</Text>
                  </View>
                </View>
              );
            }
          }
          onRefresh={() => this.props.findFeatureProcess(this.props.feature)}/>
      </Background>
    );
  }
}