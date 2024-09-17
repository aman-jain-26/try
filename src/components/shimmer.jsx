// Shimmer.js
// import React from "react";

const Shimmer = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-6xl text-center mb-10 ">Loading Products...</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <div key={index} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 animate-pulse">
                  <div className="h-[300px] w-full bg-gray-300"></div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="w-3/4">
                    <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded mt-2 w-1/2 animate-pulse"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
