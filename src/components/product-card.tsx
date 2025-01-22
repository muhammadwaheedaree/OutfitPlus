import Image from "next/image"
import Link from "next/link"
import { Wishlist } from "@/components/wishlist"

export interface Product {
  _id: string
  id: string
  name: string
  imageUrl: any
  category: string
  price: string
  discount: string
  rating: string
}

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const price = Number.parseFloat(product.price.toString().replace("$", ""))
  const discount = Number.parseFloat(product.discount.toString().replace("%", ""))
  const discountedPrice = price * (1 - discount / 100)

  return (
    <div className="flex flex-col items-center p-4 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg">
      <Link href={`/product/${product._id}`} className="relative w-full pb-[100%]">
        <Image
          src={product.imageUrl || "/placeholder.svg"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </Link>
      <div className="mt-4 text-center w-full">
        <h3 className="text-[#252B42] text-[16px] font-bold">{product.name}</h3>
        <p className="text-[#737373] text-[14px]">{product.category}</p>
        <p className="text-[#BDBDBD] text-[16px] font-bold mt-2">
          <span className="line-through">${price.toFixed(2)}</span>{" "}
          <span className="text-[#23856D]">${discountedPrice.toFixed(2)}</span>
        </p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-[#F3CD03] text-[14px]">{product.rating} ★</div>
          <Wishlist productId={product._id} />
        </div>
      </div>
    </div>
  )
}

export default ProductCard

