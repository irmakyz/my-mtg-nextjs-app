import React from "react";
import Link from "next/link";
import { COLOR_IDENTITIES } from "@/constants";

const CardItem = React.memo(({ card }) => {
  return (
    <Link
      key={card.id}
      href={`/card/${card.id}`}
      className='p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300'
    >
      <div className='p-4'>
        <p className='text-lg font-semibold text-gray-900'>{card.name}</p>
        <p className='text-sm text-gray-500'>{card.type}</p>
        <p className='text-xs text-gray-400 mt-1'>
          Colors:{" "}
          {card.colors?.map((color) => COLOR_IDENTITIES[color]).join(", ") ||
            "N/A"}
        </p>
      </div>
    </Link>
  );
});

CardItem.displayName = "CardItem";

export default CardItem;
