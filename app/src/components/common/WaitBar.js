import React from 'react';
import { Modal } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import log from '@cap-cross/cap-core';

export default class ModalWaitBar extends React.Component {
  state = {
    isVisible: false,
  };

  setVisible(visible) {
    this.setState({ isVisible: visible });
  }

  open() {
    log.trace('ModalWaitBar.open()');
    if (this.waitBar) {
      this.waitBarOpen();
    }
  }

  close() {
    log.trace('ModalWaitBar.close()');
    if (this.waitBar) {
      this.waitBarClose();
    }
  }

  waitBarOpen() {
    log.trace('WaitBar.waitBarOpen()');
    this.setVisible(true);
  }

  waitBarClose() {
    log.trace('WaitBarList.waitBarClose()');
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
          log.trace('Modal has been closed.'); // eslint-disable-line no-alert
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
