import React, { PureComponent } from 'react';
import { StatusBar } from 'react-native';
import { Provider, DarkTheme } from 'react-native-paper';
import Home from './screens/Home';

export default class App extends PureComponent {
  render() {
    return (
      <Provider theme={DarkTheme}>
        <StatusBar barStyle="light-content" backgroundColor="#1A73E9" />
        <Home />
      </Provider>
    );
  }
}
