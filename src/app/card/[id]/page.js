import React from "react";

import { fetchCardDetail } from "@/services/api";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";

export default async function CardDetail({ params }) {
  const { id } = await params;

  try {
    const data = await fetchCardDetail(id);
    const card = data.card;
    return (
      <>
        <Link href='/' className='text-blue-500 mb-4 text-xl w-fit'>
          ← Back to List
        </Link>
        <div className='max-w-md mx-auto p-8 bg-white rounded shadow-md flex flex-col gap-4'>
          <Image
            src={card.imageUrl || "/images/magic-gathering-card.png"}
            alt={card.name}
            width={210}
            height={300}
            className='self-center rounded-md'
            priority
            unoptimized
          />
          <div>
            <h1 className='text-2xl font-bold mt-2'>{card.name}</h1>
            <p>{card.text}</p>
            <p>
              <strong>Type:</strong> {card.type}
            </p>
            <p>
              <strong>Rarity:</strong> {card.rarity}
            </p>
          </div>
          <div className='mt-4 flex justify-end'>
            <FavoriteButton
              card={{
                name: card.name,
                id: card.id,
                type: card.type,
                colors: card.colors,
              }}
            />
          </div>
        </div>
      </>
    );
  } catch (err) {
    return (
      <>
        <Link href='/' className='text-blue-500 mb-4 text-xl'>
          ← Back to List
        </Link>
        <p className='text-center text-red-600 text-3xl  my-auto'>
          Card not found
        </p>
      </>
    );
  }
}
