import React from "react";
import { render, screen } from '@testing-library/react';
import CardDetailItem from '@/components/CardDetailItem';

jest.mock('@/components/FavoriteButton', () => {
  return jest.fn(() => <button>Favorite</button>);
});

describe('CardDetailItem', () => {
  const mockCard = {
    id: '1',
    name: 'Black Lotus',
    text: 'A rare Magic: The Gathering card.',
    type: 'Artifact',
    rarity: 'Rare',
    imageUrl: '/images/black-lotus.png',
    colors: ['Black', 'Blue'],
  };

  it('renders the card details correctly', () => {
    render(<CardDetailItem card={mockCard} />);

    expect(screen.getByText(mockCard.name)).toBeInTheDocument();

    expect(screen.getByText(mockCard.type)).toBeInTheDocument();

    expect(screen.getByText(mockCard.rarity)).toBeInTheDocument();

    expect(screen.getByText(mockCard.text)).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockCard.imageUrl);

    expect(screen.getByText('Favorite')).toBeInTheDocument();
  });

  it('falls back to a default image if imageUrl is not provided', () => {
    const cardWithoutImage = { ...mockCard, imageUrl: '' };
    render(<CardDetailItem card={cardWithoutImage} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/images/magic-gathering-card.png');
  });
});
