import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('has placeholder', () => {
  render(<App />);
  const linkElement = screen.getByPlaceholderText(/please input name/i);
  expect(linkElement).toBeInTheDocument();
});

test('has elment with class formAdd', () => {
  const {container} = render(<App />);

  const boxes = container.getElementsByClassName('formAdd');

  console.log(boxes.length); // 👉️ 2

  expect(boxes.length).toBe(1);
});
