"use client";
import React, { useState, Suspense, lazy, useMemo } from "react";
import { useSelector } from "react-redux";
import { fetchCardList } from "@/services/api";

import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import { selectFavorites } from "@/features/favorites/favoritesSlice";
import Search from "@/components/Search";
import { useQuery } from "@tanstack/react-query";
const CardItem = lazy(() => import("@/components/CardItem"));

export default function Home({ initialCards, initialHasMore }) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [showFavorites, setShowFavorites] = useState(false);
  const favorites = useSelector(selectFavorites);

  const { data, isFetching, error, hasMorePage } = useQuery({
    queryKey: ["cards", page, searchTerm],
    queryFn: () => fetchCardList(page, searchTerm),
    initialData: { cardsData: initialCards, hasMorePage: initialHasMore },
    staleTime: 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const visibleCards = useMemo(() => {
    if (!showFavorites) {
      setHasMore(hasMorePage);
      return data?.cardsData;
    }

    const filteredFavoriteCards = searchTerm
      ? Object.values(favorites).filter((card) =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : Object.values(favorites);

    const startIndex = (page - 1) * 20;
    const endIndex = startIndex + 20;
    setHasMore(endIndex < filteredFavoriteCards.length);

    return filteredFavoriteCards.slice(startIndex, endIndex);
  }, [showFavorites, data, favorites, searchTerm, page]);

  const toggleFavorites = () => {
    setShowFavorites((prev) => !prev);
  };

  if (isFetching)
    return (
      <div className='flex justify-center items-center h-full my-auto'>
        <Spinner />
      </div>
    );

  if (error)
    return (
      <p className='text-center text-red-600 text-3xl my-auto'>
        Failed to load cards
      </p>
    );

  return (
    <>
      <div className='mb-6 text-start relative flex flex-col md:flex-row gap-4'>
        <Search
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setPage={setPage}
        />
        <button
          onClick={toggleFavorites}
          className='px-4 py-2 text-white rounded-lg cursor-pointer bg-indigo-500 hover:bg-indigo-600 w-fit'
        >
          {showFavorites ? "Hide Favorites" : "Show Favorites"}
        </button>
      </div>

      <Suspense
        fallback={
          <div className='flex justify-center items-center h-full my-auto'>
            <Spinner />
          </div>
        }
      >
        {visibleCards?.length === 0 && (
          <p className='text-center text-red-600 text-3xl my-auto'>
            No Cards Found
          </p>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {visibleCards?.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>
        <Pagination page={page} hasMore={hasMore} setPage={setPage} />
      </Suspense>
    </>
  );
}
