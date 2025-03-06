import React from "react";

import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";

const CardDetailItem = React.memo(({ card }) => {
  return (
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
  );
});

CardDetailItem.displayName = "CardDetailItem";

export default CardDetailItem;
