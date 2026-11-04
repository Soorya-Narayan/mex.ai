import React from "react";

export default function InsightsLoading() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="shimmer h-4 w-36 rounded" />
        <div className="shimmer h-14 w-96 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {Array.from({ length: 2 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border/40 p-8 space-y-4"
            >
              <div className="shimmer h-5 w-28 rounded-full" />
              <div className="shimmer h-8 w-4/5 rounded" />
              <div className="shimmer h-4 w-full rounded" />
              <div className="shimmer h-4 w-2/3 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
