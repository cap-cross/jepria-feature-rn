// // __tests__/LoginForm-test.js
// import 'react-native';
// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
// import React from 'react';

// import { reducer as formReducer } from 'redux-form';
// import { createStore, combineReducers } from 'redux';
// import { Provider } from 'react-redux';
// import { mount, shallow } from 'enzyme';

// import LoginForm from '../LoginForm';

// /* global beforeEach, describe, it,expect */

// describe('LoginForm Component', () => {
//   let responseState; // to test response state

//   beforeEach(() => {
//     const store = createStore(combineReducers({ form: formReducer }));
//     const returnState = (state) => {
//       responseState = state;
//       return state;
//     };

//     const subject = mount(
//       <Provider store={store}>
//         <LoginForm onSubmit={returnState} />
//       </Provider>,
//     );
//   });

//   it('renders correctly', () => {
//     // const tree = renderer.create(<LoginForm onSubmit={() => null} />).toJSON();
//     const tree = shallow(<LoginForm onSubmit={() => null} />);

//     expect(tree).toMatchSnapshot();
//   });
// });
