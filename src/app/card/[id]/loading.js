import React from "react";
import Link from "next/link";

import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <>
      <Link href='/' className='text-blue-500 mb-4 text-xl w-fit'>
        ← Back to List
      </Link>
      <div className='p-8 flex flex-col items-center h-full justify-center'>
        <Spinner />
      </div>
    </>
  );
}
