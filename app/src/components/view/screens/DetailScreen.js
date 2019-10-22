import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableHighlight } from 'react-native';
import { Container, Content, Header, Body, Title, Button, Left, Icon, Right, Toast } from 'native-base';
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';

import ViewDetail from '../form/ViewDetail';
import withBackButton from '../../../components/common/hoc/withBackButton';
import {setActiveFeature} from '../../../redux/feature/featureActions';
import { deleteFeature, findFeature } from '../../../redux/feature/featureMiddleware';
import Background from '../../../components/common/Background';
import {DARK_BLUE_COLOR, DARK_AQUA_GREEN_COLOR} from '../../../../res/style';
import { LoadingPanel } from '../../common/LoadingPanel';
import getStyles from '../../../../res/styles'

const mapDispatchToProps = dispatch => ({
  deleteFeature: (values) => {return dispatch(deleteFeature(values))},
  setActiveFeature: (feature) => dispatch(setActiveFeature(feature)),
  findFeature: (searchTemplate) => dispatch(findFeature(searchTemplate))
});

const mapStateToProps = (state) => {
  return {
    feature: state.feature.activeItem,
    searchTemplate: state.feature.searchTemplate,
    isLoading: state.feature.isDeleting,
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

  removeFeature = () => {
    this.props.deleteFeature({
          featureId: this.props.feature.featureId,
        })
      .then(() => {
        this.props.findFeature(this.props.searchTemplate);
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
      });
  };

  goBack = () => this.props.navigation.goBack(null);

  goToUpdateFeature = () => {
    this.props.navigation.navigate('EditFeature');
  };

  render() {
    const feature = this.props.feature;
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
                  this.removeFeature(feature);
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
              feature={feature}
            />
          </Content>
          <View>
            <TouchableHighlight
              style={styles.button}
              underlayColor={DARK_AQUA_GREEN_COLOR}
              onPress={this.goToUpdateFeature}
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
