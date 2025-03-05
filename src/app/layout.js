"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import "@/styles/globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className='antialiased'
      >
        <Provider store={store}>
          <div className='p-8 min-w-xs flex flex-col h-full bg-indigo-200 box-border overflow-auto'>
            <h1 className='text-4xl font-bold text-center mb-6'>
              Magic The Gathering Cards
            </h1>
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
