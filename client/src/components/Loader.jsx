import React from 'react';

const Loader = () => (
  <div className="relative animate-pulse">

    {/* Navbar skeleton */}
    <div className="h-12 w-3/4 mx-auto bg-gray-200 rounded-lg mt-8 mb-8" />

    {/* Top part of blog skeleton */}
    <div className="text-center mt-20 text-gray-400">
      <div className="mx-auto h-4 w-40 bg-gray-200 rounded mb-4" />
      <div className="mx-auto h-8 w-2/3 bg-gray-200 rounded mb-4" />
      <div className="mx-auto h-5 w-1/2 bg-gray-200 rounded mb-4" />
      <div className="mx-auto h-6 w-32 bg-gray-200 rounded-full mb-6" />
    </div>

    {/* Main blog data skeleton */}
    <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
      {/* Blog image skeleton */}
      <div className="w-full h-64 bg-gray-200 rounded-3xl mb-5" />

      {/* Blog description skeleton */}
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
        <div className="h-4 bg-gray-200 rounded w-3/6" />
      </div>

      {/* Comments Section skeleton */}
      <div className="mt-14 mb-10 max-w-3xl mx-auto">
        <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
        <div className="flex flex-col gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="relative bg-gray-100 border border-gray-200 max-w-xl p-4 rounded">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div className="h-4 w-24 bg-gray-200 rounded" />
              </div>
              <div className="h-3 w-3/4 bg-gray-200 rounded ml-8 mb-2" />
              <div className="absolute right-4 bottom-3 h-3 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Add Comment Form skeleton */}
      <div className="max-w-3xl mx-auto">
        <div className="h-5 w-40 bg-gray-200 rounded mb-4" />
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="h-10 w-full bg-gray-200 rounded" />
          <div className="h-24 w-full bg-gray-200 rounded" />
          <div className="h-10 w-32 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Share buttons skeleton */}
      <div className="my-24 max-w-3xl mx-auto">
        <div className="h-5 w-48 bg-gray-200 rounded mb-4" />
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-12 h-12 bg-gray-200 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Loader;