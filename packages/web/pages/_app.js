import App, { Container } from 'next/app';
import React from 'react';
import configureStore from '../redux/configureStore';
import { Provider } from 'react-redux';

class MyApp extends App {
  render () {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  };
};

export default configureStore(MyApp);