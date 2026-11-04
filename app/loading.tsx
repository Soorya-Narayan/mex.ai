import React from "react";

export default function RootLoading() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="shimmer h-4 w-32 rounded" />
        <div className="shimmer h-14 w-full max-w-2xl rounded-xl" />
        <div className="shimmer h-6 w-full max-w-xl rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border/40 p-6 space-y-4"
            >
              <div className="shimmer h-10 w-10 rounded-lg" />
              <div className="shimmer h-6 w-3/4 rounded" />
              <div className="shimmer h-4 w-full rounded" />
              <div className="shimmer h-4 w-2/3 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
