import axios from "axios";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Product = () => {
  const params = useParams();
  const [title, setTitle] = useState();
  const queryClient = new QueryClient();
  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["product", params.productId],
    queryFn: async () => {
      const response = await axios.get(
        `https://dummyjson.com/products/${params.productId}`
      );
      return response.data;
    },
  });

  const updateData = async ({ id, title }) => {
    return await axios.put(`https://dummyjson.com/products/${id}`, { title });
    // return res.data;
  };

  const {
    mutate,
    isError: isMutateError,
    isIdle,
    data,
  } = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries(["products", params.productId]);
    },
  });

  const handleClick = () => {
    console.log("product.id", title);
    mutate({ id: product.id, title });
    setTitle(product.title);
  };
  if (isIdle) {
    console.log("Hello");
  }
  if (data) {
    console.log(data);
  }
  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Error: {error.message}</h3>;
  }

  return (
    <>
      <div className="flex gap-3 w-full my-5">
        <label htmlFor="product" className="mt-2">
          Product Title:{" "}
        </label>
        <input
          type="text"
          id="product"
          value={title}
          placeholder={product.title}
          className="w-1/4 p-2 border rounded-lg"
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="border rounded-lg px-3 py-1 bg-teal-300"
          onClick={handleClick}
        >
          Update
        </button>
      </div>
      Product : {product.title}
    </>
  );
};

export default Product;
