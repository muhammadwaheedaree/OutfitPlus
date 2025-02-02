// import { getProductById, getRecommendedProducts, getCategories } from "@/sanity/lib/client"
// import Image from "next/image"
// import RecommendedProducts from "@/components/recommended-products"
// import ReviewsAndRatings from "@/components/reviews-and-ratings"
// import type { Product } from "@/components/product-card"

// export default async function ProductPage({ params }: { params: { id: string } }) {
//   const [product, recommendedProductsData, categories] = await Promise.all([
//     getProductById(params.id),
//     getRecommendedProducts(params.id),
//     getCategories(),
//   ])

//   if (!product) {
//     return <div>Product not found</div>
//   }

//   const price = Number.parseFloat(product.price.toString().replace("$", ""))
//   const discount = Number.parseFloat(product.discount.toString().replace("%", ""))
//   const discountedPrice = price * (1 - discount / 100)

//   const recommendedProducts: Product[] = recommendedProductsData.map((product: any) => ({
//     _id: product._id,
//     id: product.id,
//     name: product.name,
//     imageUrl: product.imageUrl,
//     category: product.category,
//     price: product.price,
//     discount: product.discount,
//     rating: product.rating,
//   }))

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col lg:flex-row gap-8 mb-16">
//         <div className="lg:w-1/2">
//           <Image
//             src={product.imageUrl || "/placeholder.svg"}
//             alt={product.name}
//             width={500}
//             height={500}
//             className="rounded-lg w-full h-auto object-cover"
//           />
//         </div>
//         <div className="lg:w-1/2">
//           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//           <p className="text-gray-600 mb-4">{product.category}</p>
//           <div className="mb-4">
//             <span className="text-2xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
//             <span className="ml-2 text-gray-500 line-through">${price.toFixed(2)}</span>
//             <span className="ml-2 text-green-500">({product.discount}% off)</span>
//           </div>
//           <div className="mb-4">
//             <span className="text-yellow-400">{product.rating} ★</span>
//           </div>
//           <p className="text-gray-700 mb-6">{product.description}</p>
//           <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       <ReviewsAndRatings productId={product._id} />

//       <div className="mt-16">
//              <RecommendedProducts recommendedProducts={recommendedProducts} />
//       </div>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import RecommendedProducts from "@/components/recommended-products"
import ReviewsAndRatings from "@/components/reviews-and-ratings"
import { useCart } from "@/context/CartContext"
import { getProductById, getRecommendedProducts, getCategories } from "@/sanity/lib/client"
import type { Product } from "@/components/product-card"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      const [productData, recommendedProductsData, categories] = await Promise.all([
        getProductById(params.id),
        getRecommendedProducts(params.id),
        getCategories(),
      ])

      setProduct(productData)
      setRecommendedProducts(
        recommendedProductsData.map((product: any) => ({
          _id: product._id,
          id: product.id,
          name: product.name,
          imageUrl: product.imageUrl,
          category: product.category,
          price: product.price,
          discount: product.discount,
          rating: product.rating,
        })),
      )
    }

    fetchData()
  }, [params.id])

  if (!product) {
    return <div>Loading...</div>
  }

  const price = Number.parseFloat(product.price.toString().replace("$", ""))
  const discount = Number.parseFloat(product.discount.toString().replace("%", ""))
  const discountedPrice = price * (1 - discount / 100)

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: discountedPrice,
      quantity: 1,
      imageUrl: product.imageUrl,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 mb-16">
        <div className="lg:w-1/2">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <div className="mb-4">
            <span className="text-2xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
            <span className="ml-2 text-gray-500 line-through">${price.toFixed(2)}</span>
            <span className="ml-2 text-green-500">({product.discount}% off)</span>
          </div>
          <div className="mb-4">
            <span className="text-yellow-400">{product.rating} ★</span>
          </div>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <ReviewsAndRatings productId={product._id} />

      <div className="mt-16">
        <RecommendedProducts recommendedProducts={recommendedProducts} />
      </div>
    </div>
  )
}


