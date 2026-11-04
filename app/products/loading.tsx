import React from "react";

export default function ProductsLoading() {
  return (
    <main className="min-h-screen">
      {/* Hero skeleton */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="shimmer h-4 w-32 rounded mb-8" />
          <div className="shimmer h-5 w-24 rounded mb-4" />
          <div className="shimmer h-14 w-96 rounded mb-4" />
          <div className="shimmer h-6 w-full max-w-2xl rounded mb-2" />
          <div className="shimmer h-6 w-3/4 max-w-xl rounded" />
        </div>
      </section>
      {/* Grid skeleton */}
      <section className="pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border/40 p-6 space-y-4">
                <div className="shimmer h-8 w-8 rounded" />
                <div className="shimmer h-6 w-40 rounded" />
                <div className="shimmer h-4 w-full rounded" />
                <div className="space-y-1.5">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="shimmer h-3 w-11/12 rounded" />
                  ))}
                </div>
                <div className="shimmer h-4 w-24 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

