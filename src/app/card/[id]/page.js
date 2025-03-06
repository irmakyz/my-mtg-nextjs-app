import React from "react";

import { fetchCardDetail } from "@/services/api";
import Link from "next/link";
import CardDetailItem from "@/components/CardDetailItem";

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
        <CardDetailItem card={card} />
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
