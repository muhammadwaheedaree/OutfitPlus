import { NextApiRequest, NextApiResponse } from 'next'

const products = [
  // Men's Wear (8 products)
  {
    id: "1",
    name: "Men's Slim Fit Jeans",
    imageUrl: "/images/mens-jeans.png",
    price: "$49.99",
    discount: "20%",
    description: "Comfortable slim-fit jeans for everyday wear",
    category: "Men's Wear",
    rating: "4.5"
  },
  {
    id: "2",
    name: "Men's Casual Shirt",
    imageUrl: "/images/mens-shirt.jpg",
    price: "$29.99",
    discount: "10%",
    description: "Stylish casual shirt for a smart look",
    category: "Men's Wear",
    rating: "4.3"
  },
  {
    id: "3",
    name: "Men's Leather Jacket",
    imageUrl: "/images/mens-jacket.jpg",
    price: "$99.99",
    discount: "15%",
    description: "Classic leather jacket for a bold style",
    category: "Men's Wear",
    rating: "4.7"
  },
  {
    id: "4",
    name: "Men's Formal Suit",
    imageUrl: "/images/mens-suit.jpg",
    price: "$199.99",
    discount: "25%",
    description: "Elegant formal suit for special occasions",
    category: "Men's Wear",
    rating: "4.8"
  },
  {
    id: "5",
    name: "Men's Sports Shorts",
    imageUrl: "/images/mens-shorts.jpg",
    price: "$24.99",
    discount: "5%",
    description: "Comfortable shorts for sports and leisure",
    category: "Men's Wear",
    rating: "4.2"
  },
  {
    id: "6",
    name: "Men's Polo T-Shirt",
    imageUrl: "/images/mens-polo.jpg",
    price: "$34.99",
    discount: "10%",
    description: "Classic polo t-shirt for a casual look",
    category: "Men's Wear",
    rating: "4.4"
  },
  {
    id: "7",
    name: "Men's Winter Coat",
    imageUrl: "/images/mens-coat.jpg",
    price: "$129.99",
    discount: "30%",
    description: "Warm winter coat for cold weather",
    category: "Men's Wear",
    rating: "4.6"
  },
  {
    id: "8",
    name: "Men's Swim Shorts",
    imageUrl: "/images/mens-swim.jpg",
    price: "$19.99",
    discount: "5%",
    description: "Quick-dry swim shorts for beach and pool",
    category: "Men's Wear",
    rating: "4.1"
  },
  // Women's Wear (8 products)
  {
    id: "9",
    name: "Women's Summer Dress",
    imageUrl: "/images/womens-dress.jpg",
    price: "$59.99",
    discount: "15%",
    description: "Light and breezy summer dress",
    category: "Women's Wear",
    rating: "4.7"
  },
  {
    id: "10",
    name: "Women's Blouse",
    imageUrl: "/images/womens-blouse.jpg",
    price: "$39.99",
    discount: "10%",
    description: "Elegant blouse for office and casual wear",
    category: "Women's Wear",
    rating: "4.4"
  },
  {
    id: "11",
    name: "Women's Skinny Jeans",
    imageUrl: "/images/womens-jeans.jpg",
    price: "$54.99",
    discount: "20%",
    description: "Comfortable skinny jeans for a sleek look",
    category: "Women's Wear",
    rating: "4.6"
  },
  {
    id: "12",
    name: "Women's Maxi Skirt",
    imageUrl: "/images/womens-skirt.jpg",
    price: "$49.99",
    discount: "15%",
    description: "Flowing maxi skirt for elegant style",
    category: "Women's Wear",
    rating: "4.3"
  },
  {
    id: "13",
    name: "Women's Cardigan",
    imageUrl: "/images/womens-cardigan.jpg",
    price: "$44.99",
    discount: "10%",
    description: "Cozy cardigan for layering",
    category: "Women's Wear",
    rating: "4.5"
  },
  {
    id: "14",
    name: "Women's Yoga Pants",
    imageUrl: "/images/womens-yoga.jpg",
    price: "$34.99",
    discount: "5%",
    description: "Stretchy yoga pants for workout and leisure",
    category: "Women's Wear",
    rating: "4.2"
  },
  {
    id: "15",
    name: "Women's Cocktail Dress",
    imageUrl: "/images/womens-cocktail.jpg",
    price: "$89.99",
    discount: "25%",
    description: "Stunning cocktail dress for parties",
    category: "Women's Wear",
    rating: "4.8"
  },
  {
    id: "16",
    name: "Women's Denim Jacket",
    imageUrl: "/images/womens-jacket.jpg",
    price: "$64.99",
    discount: "15%",
    description: "Classic denim jacket for all seasons",
    category: "Women's Wear",
    rating: "4.4"
  },
  // Kid's Wear (8 products)
  {
    id: "17",
    name: "Kid's T-Shirt",
    imageUrl: "/images/kids-tshirt.jpg",
    price: "$14.99",
    discount: "10%",
    description: "Comfortable cotton t-shirt for kids",
    category: "Kid's Wear",
    rating: "4.3"
  },
  {
    id: "18",
    name: "Kid's Jeans",
    imageUrl: "/images/kids-jeans.jpg",
    price: "$24.99",
    discount: "15%",
    description: "Durable jeans for active kids",
    category: "Kid's Wear",
    rating: "4.5"
  },
  {
    id: "19",
    name: "Kid's Dress",
    imageUrl: "/images/kids-dress.jpg",
    price: "$29.99",
    discount: "20%",
    description: "Cute dress for little girls",
    category: "Kid's Wear",
    rating: "4.7"
  },
  {
    id: "20",
    name: "Kid's Sweater",
    imageUrl: "/images/kids-sweater.jpg",
    price: "$19.99",
    discount: "10%",
    description: "Warm sweater for cold days",
    category: "Kid's Wear",
    rating: "4.2"
  },
  {
    id: "21",
    name: "Kid's Shorts",
    imageUrl: "/images/kids-shorts.jpg",
    price: "$16.99",
    discount: "5%",
    description: "Comfortable shorts for summer",
    category: "Kid's Wear",
    rating: "4.1"
  },
  {
    id: "22",
    name: "Kid's Pajamas",
    imageUrl: "/images/kids-pajamas.jpg",
    price: "$22.99",
    discount: "15%",
    description: "Cozy pajamas for a good night's sleep",
    category: "Kid's Wear",
    rating: "4.6"
  },
  {
    id: "23",
    name: "Kid's Raincoat",
    imageUrl: "/images/kids-raincoat.jpg",
    price: "$34.99",
    discount: "20%",
    description: "Colorful raincoat to stay dry",
    category: "Kid's Wear",
    rating: "4.4"
  },
  {
    id: "24",
    name: "Kid's School Uniform",
    imageUrl: "/images/kids-uniform.jpg",
    price: "$39.99",
    discount: "10%",
    description: "Standard school uniform set",
    category: "Kid's Wear",
    rating: "4.3"
  },
  // Accessories (8 products)
  {
    id: "25",
    name: "Leather Wallet",
    imageUrl: "/images/wallet.jpg",
    price: "$29.99",
    discount: "10%",
    description: "Genuine leather wallet with multiple compartments",
    category: "Accessories",
    rating: "4.5"
  },
  {
    id: "26",
    name: "Sunglasses",
    imageUrl: "/images/sunglasses.jpg",
    price: "$59.99",
    discount: "15%",
    description: "Stylish sunglasses with UV protection",
    category: "Accessories",
    rating: "4.3"
  },
  {
    id: "27",
    name: "Watch",
    imageUrl: "/images/watch.jpg",
    price: "$99.99",
    discount: "20%",
    description: "Elegant wristwatch for all occasions",
    category: "Accessories",
    rating: "4.7"
  },
  {
    id: "28",
    name: "Scarf",
    imageUrl: "/images/scarf.jpg",
    price: "$19.99",
    discount: "5%",
    description: "Soft and warm scarf for winter",
    category: "Accessories",
    rating: "4.2"
  },
  {
    id: "29",
    name: "Handbag",
    imageUrl: "/images/handbag.jpg",
    price: "$79.99",
    discount: "25%",
    description: "Spacious handbag for everyday use",
    category: "Accessories",
    rating: "4.6"
  },
  {
    id: "30",
    name: "Belt",
    imageUrl: "/images/belt.jpg",
    price: "$24.99",
    discount: "10%",
    description: "Classic leather belt",
    category: "Accessories",
    rating: "4.4"
  },
  {
    id: "31",
    name: "Necklace",
    imageUrl: "/images/necklace.jpg",
    price: "$49.99",
    discount: "15%",
    description: "Elegant necklace for special occasions",
    category: "Accessories",
    rating: "4.8"
  },
  {
    id: "32",
    name: "Backpack",
    imageUrl: "/images/backpack.jpg",
    price: "$39.99",
    discount: "10%",
    description: "Durable backpack for daily use",
    category: "Accessories",
    rating: "4.5"
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(products)
}

