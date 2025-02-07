"use client";

import { useEffect, useState } from "react";
import ProductCard, { type Product } from "./product-card";
import { getFeaturedProducts } from "@/sanity/lib/client";

const FeatureProducts: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const result = await getFeaturedProducts();
      setFeaturedProducts(result);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center mt-5 mb-7 overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 w-full max-w-6xl mx-auto px-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeatureProducts;
