"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CategoryFilter } from "@/components/category-filter";
import { PriceRangeSlider } from "@/components/price-range-slider";
import ProductCard from "@/components/product-card";
import { getPaginatedProducts } from "@/sanity/lib/client";

interface Product {
  _id: string;
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  price: number;
  discount: number;
  rating: string;
  tags: string[];
}

interface CardsProps {
  initialProducts: Product[];
  totalProducts: number;
  initialPage: number;
  initialCategory: string;
  categories: string[];
  initialSearchQuery: string;
}

export default function Cards({
  initialProducts,
  totalProducts,
  initialPage,
  initialCategory,
  categories,
  initialSearchQuery,
}: CardsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [total, setTotal] = useState(totalProducts);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const perPage = 8;

  useEffect(() => {
    const page = searchParams?.get("page")
      ? Number(searchParams.get("page"))
      : 1;
    const category = searchParams?.get("category") || "All";
    const search = searchParams?.get("search") || "";

    setCurrentPage(page);
    setActiveCategory(category);
    setSearchQuery(search);
  }, [searchParams]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const selectedCategories = activeCategory
          .split(",")
          .filter((c) => c !== "All");
        const result = await getPaginatedProducts(
          currentPage,
          perPage,
          selectedCategories.length > 0 ? selectedCategories : undefined,
          searchQuery
        );
        const filteredProducts = result.products.filter((product: Product) => {
          return (
            product.price >= priceRange[0] && product.price <= priceRange[1]
          );
        });
        setProducts(filteredProducts);
        setTotal(result.totalProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [currentPage, activeCategory, priceRange, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    router.push(
      `/product?page=1&category=${encodeURIComponent(category)}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(
      `/product?page=${page}&category=${encodeURIComponent(activeCategory)}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ""}`
    );
  };

  const handlePriceRangeChange = (values: [number, number]) => {
    setPriceRange(values);
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center mb-8">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={handleCategoryChange}
        />
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Price Range</h3>
          <PriceRangeSlider
            min={0}
            max={1000}
            onChange={handlePriceRangeChange}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-12 mb-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage <= 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => handlePageChange(i + 1)}
                        isActive={currentPage === i + 1}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage >= totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
}
