import React from 'react';
import { Modal } from 'react-native';
import { Container, Content, Spinner } from 'native-base';

export default class ModalWaitBar extends React.Component {
  state = {
    isVisible: false,
  };

  setVisible(visible) {
    this.setState({ isVisible: visible });
  }

  open() {
    console.log('ModalWaitBar.open()');
    if (this.waitBar) {
      this.waitBarOpen();
    }
  }

  close() {
    console.log('ModalWaitBar.close()');
    if (this.waitBar) {
      this.waitBarClose();
    }
  }

  waitBarOpen() {
    console.log('WaitBar.waitBarOpen()');
    this.setVisible(true);
  }

  waitBarClose() {
    console.log('WaitBarList.waitBarClose()');
    this.setVisible(false);
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isVisible}
        onRequestClose={() => {
//          alert('Modal has been closed.'); // eslint-disable-line no-alert
          console.log('Modal has been closed.'); // eslint-disable-line no-alert
        }}
        ref={(c) => {
          this.waitBar = c;
        }}
      >
        <Container
          style={{
            marginTop: 250,
            alignItems: 'center',
          }}
        >
          <Content>
            <Spinner color="gray" />
          </Content>
        </Container>
      </Modal>
    );
  }
}
