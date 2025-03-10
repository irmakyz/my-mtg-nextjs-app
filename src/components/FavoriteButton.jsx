"use client";

import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, selectFavorites } from '@/features/favorites/favoritesSlice';

export default function FavoriteButton({ card }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const isFavorite = Object.keys(favorites).includes(card.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(card));
    } else {
      dispatch(addFavorite(card));
    }
  };

  return (
    <button onClick={toggleFavorite} className='flex items-center cursor-pointer'>
      <FaHeart
        className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
      />
    </button>
  );
}