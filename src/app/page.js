import React, { lazy, Suspense } from "react";
import { fetchCardList } from "@/services/api";
import Spinner from "@/components/Spinner";

const Home = lazy(() => import("@/components/Home"));

export default async function HomePage() {

  try {
    const { cardsData, hasMorePage } = await fetchCardList(1, "");
    return (
      <Suspense
        fallback={
          <div className='flex flex-col justify-center items-center my-auto'>
            <Spinner />
          </div>
        }
      >
        <Home
          initialCards={cardsData}
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
