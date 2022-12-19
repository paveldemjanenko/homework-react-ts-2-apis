import { render } from '@testing-library/react';
import App from './App';

test('renders user form', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
