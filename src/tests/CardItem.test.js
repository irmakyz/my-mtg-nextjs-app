import React from 'react';
import { render } from '@testing-library/react';
import CardItem from '@/components/CardItem';
import { COLOR_IDENTITIES } from '@/constants';

const card = {
  id: '1',
  name: 'Test Card',
  type: 'Creature',
  colors: ['W', 'U'],
};

test('renders CardItem with correct details', () => {
  const { getByText } = render(<CardItem card={card} />);
  expect(getByText('Test Card')).toBeInTheDocument();
  expect(getByText('Creature')).toBeInTheDocument();
  expect(getByText(`Colors: ${COLOR_IDENTITIES['W']}, ${COLOR_IDENTITIES['U']}`)).toBeInTheDocument();
});