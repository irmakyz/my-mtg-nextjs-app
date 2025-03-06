// app/page.js (or your page component file)
import React, { Suspense } from "react";
import { fetchCardList } from "@/services/api";
import Home from "@/components/Home";
import Spinner from "@/components/Spinner";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const page =  Number(params?.page) || 1;
  const searchTerm =  params?.search || "";

  try {
    const { cardsData, hasMorePage } = await fetchCardList(page, searchTerm);
    return (
      <Suspense
        fallback={
          <div className='flex justify-center items-center my-auto'>
            <Spinner />
          </div>
        }
      >
        <Home
          cards={cardsData}
          initialPage={page}
          initialSearchTerm={searchTerm}
          initialHasMore={hasMorePage}
        />
      </Suspense>
    );
  } catch (err) {
    return (
      <p className='text-center text-red-600 text-3xl my-auto'>
        Failed to load cards
      </p>
    );
  }
}
