import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text, View } from 'react-native';
import { Toast} from 'native-base';
import compose from 'recompose/compose';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { findHistory } from '../../../redux/history/historyMiddleware';
import {EmptyView} from '@cap-cross/cap-react-native';
import { pure } from 'recompose';

class HistoryListItem extends React.PureComponent {

  getStyles = props => ({
    card: {
      backgroundColor: 'rgba(17,49,85,0.55)',
      borderRadius: 15,
      padding: 15,
      marginVertical: 7, 
      marginHorizontal: 15,
    },
    text: {
      color: 'white',
      marginLeft: 8,
    },
  });

  render() {
    const styles = this.getStyles(this.props);
    return (
      <View style={styles.card}>
        <View>
          <Text style={{...styles.text, fontWeight: 'bold', fontSize:16}}>{this.props.item.statusName}</Text>
        </View>
        <View>
          <Text style={{...styles.text, fontSize: 14}}>Дата изменения: {this.props.item.date}</Text>
        </View>
      </View>
    );
  }

}

class HistoryList extends React.Component {

  componentDidMount() {
    this.findHistory();
  }

  renderListItem = ({item}) => (
    <HistoryListItem item={item}/>
  );

  findHistory = () => {
    this.props.findHistory(this.props.task);
  }

  render() {
    const {items} = this.props.history;
    let content = <EmptyView text="Исторических записей не найдено" />; 
    
    if (items.length > 0) {
      content = (
        <FlatList
          data={items}
          renderItem={this.renderListItem}
          keyExtractor={(item, index) => index.toString()} // TODO Проверить корректность
        />);
    }

    return (
      <View>
        {content}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    task: state.tasks.activeItem,
    history: state.history,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    findHistory: (task) => dispatch(findHistory(task))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList);