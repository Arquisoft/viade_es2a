import React from 'react';
import { render, cleanup } from 'react-testing-library';
import FloatingButton from './floating-button.component';

afterAll(cleanup);

const { container } = render(<FloatingButton />);

describe('FloatingButton', () => {
  it('renders without crashing', () => {
    expect(container).toBeTruthy();
  });
});
