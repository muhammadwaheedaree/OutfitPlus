"use client"

import { useState, useEffect } from "react"
import ProductCard, { type Product } from "@/components/product-card"
import { getProductById } from "@/sanity/lib/client"
import { Heart } from "lucide-react"

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      setIsLoading(true)
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
      const products = await Promise.all(wishlist.map((id: string) => getProductById(id)))
      setWishlistProducts(products.filter(Boolean))
      setIsLoading(false)
    }

    fetchWishlistProducts()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Heart className="mr-2 h-8 w-8 text-primary" />
        Your Wishlist
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : wishlistProducts.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <p className="text-xl text-gray-600">Your wishlist is empty.</p>
          <p className="text-gray-500 mt-2">Start adding products you love!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

