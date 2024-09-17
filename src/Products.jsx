import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import Shimmer from "./components/shimmer";
const Products = () => {
  const [skip, setSkip] = useState(0);
  const fetchData = async () => {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=4&skip=${skip}`
    );
    return response.data.products;
  };
  const handlePrev = () => {
    if (skip > 0) setSkip(skip - 4);
    if (skip == 0) setSkip(0);
  };

  const handleNext = () => {
    setSkip(skip + 4);
  };

  const {
    data: products,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["products", skip],
    queryFn: () => fetchData(skip),
    cacheTime: 10000,
    staleTime: 10000,
    placeholderData: keepPreviousData,
    // initialData:
    // enabled: false,
    // refetchInterval: 2000,//will refetch from server after every 2 sec
  });

  console.log(isLoading, isFetching);

  if (isLoading) return <Shimmer />;
  if (isError) return <div>Error</div>;
  //   if (isFetching) return <div>Fetching...</div>;
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-6xl text-center mb-5">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
            {products?.map((product) => (
              <div key={product.id} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    // alt={product.title}
                    src={product.thumbnail}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/products/${product.id}`}>
                        <span
                          aria-hidden="true"
                          //   className="absolute inset-0 "
                        />
                        {product.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {product.category}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center flex justify-center items-center gap-3">
        <button
          className="bg-slate-600 border p-1 px-2 rounded-md text-white"
          onClick={handlePrev}
          disabled={skip == 0}
        >
          Prev Page
        </button>
        <p>{skip / 4 + 1} </p>
        <button
          className="bg-slate-600 border p-1 px-2 rounded-md text-white"
          onClick={handleNext}
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default Products;
