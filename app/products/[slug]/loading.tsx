import React from "react";

export default function ProductPageLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero skeleton */}
      <section className="pt-20 pb-16 border-b border-border/40">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="shimmer h-4 w-48 rounded mb-8" />
          <div className="shimmer h-4 w-24 rounded mb-4" />
          <div className="shimmer h-16 w-80 rounded mb-4" />
          <div className="shimmer h-6 w-96 rounded mb-4" />
          <div className="shimmer h-5 w-full max-w-2xl rounded mb-2" />
          <div className="shimmer h-5 w-3/4 max-w-xl rounded mb-8" />
          <div className="flex gap-4">
            <div className="shimmer h-14 w-48 rounded-xl" />
            <div className="shimmer h-14 w-48 rounded-xl" />
          </div>
        </div>
      </section>
      {/* Features skeleton */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="shimmer h-8 w-48 rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="shimmer h-16 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

