// loginMedianor.js
// Используется для слабосвязанной интеграции компонента с LoginForm с функционалом аутентификации
// TODO Перенести состояние в Redux
import log from '@cap-cross/cap-core';

const loginMediator = {
  dialogForm: undefined,

  waitBar: undefined,

  // Слушатель LoginForm submit со стороны функционала аутентификации
  loginSubmitListener: undefined,

  isLoginFormOpened: false, // Поскольку isOpen не работает

  isWaitBarOpened: false,

  openLoginForm() {
    log.trace(
      `loginMediator.openLoginForm(): this.isLoginFormOpened = ${this.isLoginFormOpened}`,
    );

    if (!this.isLoginFormOpened) {
      this.dialogForm.loginOpen();
      this.isLoginFormOpened = true;
      log.trace('loginMediator.openLoginForm() - Done');
    } else {
      log.trace('loginMediator.openLoginForm() - Was already opened');
    }
  },

  closeLoginForm() {
    log.trace(
      `loginMediator.closeLoginForm(): this.isLoginFormOpened = ${this.isLoginFormOpened}`,
    );

    if (this.isLoginFormOpened) {
      this.dialogForm.loginClose();
      this.isLoginFormOpened = false;
      log.trace('loginMediator.closeLoginForm() - Done');
    }
  },

  openAuthRequestWaitBar() {
    log.trace(
      `loginMediator.openAuthRequestWaitBar(): this.isWaitBarOpened = ${this.isWaitBarOpened}`,
    );
    if (!this.isWaitBarOpened) {
      this.waitBar.open();
      this.isWaitBarOpened = true;
      log.trace('loginMediator.openAuthRequestWaitBar() - Done ');
    }
  },
  closeAuthRequestWaitBar() {
    log.trace(
      `loginMediator.closeAuthRequestWaitBar(): this.isWaitBarOpened = ${this.isWaitBarOpened}`,
    );
    if (this.isWaitBarOpened) {
      this.waitBar.close();
      this.isWaitBarOpened = false;
      log.trace('loginMediator.closeAuthRequestWaitBar() - Done ');
    }
  },

  // Callback для LoginForm submit
  onLoginSubmit: (credentials) => {
    log.trace(`loginMediator.onLoginSubmit() BEGIN: credentials = ${credentials}`);
    const lsListener = loginMediator.loginSubmitListener;
    log.trace(`loginMediator.onLoginSubmit(): lsListener = ${lsListener}`);

    if (lsListener) {
      lsListener(credentials);
    } else {
      throw new Error('loginSubmitListener should be set');
    }

    log.trace(`loginMediator.onLoginSubmit() END`);
  },
};

module.exports = loginMediator;
