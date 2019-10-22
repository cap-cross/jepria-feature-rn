import React from 'react';
import { FlatList, View, ActivityIndicator, Text} from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import FeatureItem from './FeatureItem';
import { findFeature, deleteFeature } from '../../../../redux/feature/featureMiddleware';
import {LIGHT_AQUA_GREEN_COLOR} from '../../../../../res/style';

const mapStateToProps = (state) => {
  return {
    errorMessage: state.feature.errorMessage,
    isFailed: state.feature.isFailed,
    isLoading: state.feature.isFetching,
    items: state.feature.items,
    searchTemplate: state.feature.searchTemplate,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findFeature: (searchTemplate) => dispatch(findFeature(searchTemplate)),
    deleteFeature: (featureId) => dispatch(deleteFeature(featureId))
  };
}

class FeatureList extends React.Component {

  componentDidMount() {
    this.props.findFeature(this.props.searchTemplate);
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchTemplate !== prevProps.searchTemplate) {
      this.props.findFeature(this.props.searchTemplate);
    }
  }

  renderFeatureItem = ({ item }) => (
    <FeatureItem
      item={item}
      navigation={this.props.navigation}
      remove={() => this.props.deleteFeature(item.featureId)}
    />
  );

  render() {

    let contentView = (
      <View style={{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',}}>
        <Icon name={'assignment'}  type="MaterialIcons" style={{ color: '#E91E63', fontSize: 60,}} />
        <Text style={{color: 'white'}}>Задач не найдено</Text>
      </View>
    );

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
          onRefresh={() => this.props.findFeature(this.props.searchTemplate)}
          data={items}
          renderItem={this.renderFeatureItem}
          keyExtractor={(item, index) => index.toString()} // TODO Проверить корректность
        />
      );
    }

    const result = (
      <View style={{flex: 1}}>
        {contentView}
      </View>
    );

    return result;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureList)