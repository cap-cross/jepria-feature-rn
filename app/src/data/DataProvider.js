import React from 'react';
import { Provider } from 'react-redux';

export default DataProvider = ({store, children}) => {
  return (
    <Provider store={store}>
      {React.Children.only(children)}
    </Provider>
  );
}
