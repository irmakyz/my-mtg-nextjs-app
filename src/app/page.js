"use client";
import React, { useCallback } from "react";

import { useState, useEffect, Suspense, lazy, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import { fetchCardList } from "@/services/api";

import { selectFavorites } from "@/features/favorites/favoritesSlice";
import Search from "@/components/Search";

const CardItem = lazy(() => import("@/components/CardItem"));

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialPage = Number(searchParams.get("page")) || 1;
  const initialSearch = searchParams.get("search") || "";

  const favorites = useSelector(selectFavorites);

  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const fetchCardsData = async () => {
      setIsLoading(true);
      try {
        const { cardsData, hasMore } = await fetchCardList(page, searchTerm);
        setHasMore(hasMore);
        setCards(cardsData);
      } catch (err) {
        setError("Failed to load cards");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCardsData();
  }, [page, searchTerm]);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    router.push(`/?page=${newPage}&search=${searchTerm}`, { scroll: false });
  }, [router, searchTerm]);

  const toggleFavorites = useCallback(() => {
    setShowFavorites(!showFavorites);
  }, [showFavorites]);

  const visibleCards = useMemo(() => {
    if (!showFavorites) {
      return cards;
    }
    return searchTerm
      ? Object.values(favorites).filter((card) =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : Object.values(favorites);
  }, [showFavorites, cards, favorites, searchTerm]);

  return (
    <>
      <div className='mb-6 text-start relative flex flex-col md:flex-row gap-4'>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} setPage={setPage}/>
        <button
          onClick={toggleFavorites}
          className='px-4 py-2 text-white rounded-lg cursor-pointer bg-indigo-500 hover:bg-indigo-600'
        >
          {showFavorites ? "Hide Favorites" : "Show Favorites"}
        </button>
      </div>

      {error && (
        <p className='text-center text-red-600 text-3xl  my-auto'>{error}</p>
      )}

      {isLoading ? (
        <div className='flex justify-center items-center my-auto'>
          <Spinner />
        </div>
      ) : (
        <Suspense
          fallback={
            <div className='flex justify-center items-center h-full my-auto'>
              <Spinner />
            </div>
          }
        >
          {visibleCards.length === 0 && (
            <p className='text-center text-red-600 text-3xl  my-auto'>
              No Cards Found
            </p>
          )}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {visibleCards?.map((card) => (
              <CardItem key={card.id} card={card} />
            ))}
          </div>
          <Pagination
            page={page}
            hasMore={hasMore}
            handlePageChange={handlePageChange}
          />
        </Suspense>
      )}
    </>
  );
}
