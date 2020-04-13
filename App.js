/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppNavigator from './app/navigation/stacknavigation'
import configStore from './app/store'
import { Provider } from 'react-redux'
import {SafeAreaView} from 'react-native'

const App: () => React$Node = () => {
  return (
    <Provider store={configStore}>
        <AppNavigator />
    </Provider>

  );
};

export default App;
