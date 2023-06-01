import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders', async () => {
  const hss = async () => {}
  render(<App hideSplashScreen={hss} />);
});
