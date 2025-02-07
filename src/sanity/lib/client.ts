import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  projectId: "6jutbhfg",
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function getCategories() {
  return client.fetch(`
    *[_type == "category"] {
      name
    } | order(name asc)
  `);
}

export async function getPaginatedProducts(
  page: number,
  perPage: number,
  categories?: string[],
  searchQuery?: string
) {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const query = `
    {
      "products": *[_type == "product" 
        ${categories && categories.length > 0 ? `&& category in $categories` : ""}
        ${searchQuery ? `&& (name match $searchQuery || $searchQuery in tags)` : ""}
      ] | order(_createdAt desc) [${start}...${end}] {
        _id, 
        id, 
        name, 
        "imageUrl": image.asset->url,
        category, 
        price, 
        discount, 
        rating,
        tags
      },
      "totalProducts": count(*[_type == "product" 
        ${categories && categories.length > 0 ? `&& category in $categories` : ""}
        ${searchQuery ? `&& (name match $searchQuery || $searchQuery in tags)` : ""}
      ])
    }
  `;

  const params: any = {};
  if (categories && categories.length > 0) params.categories = categories;
  if (searchQuery) params.searchQuery = searchQuery;

  return client.fetch(query, params);
}

export async function getProductById(id: string) {
  return client.fetch(
    `
    *[_type == "product" && _id == $id][0] {
      _id,
      id,
      name,
      "imageUrl": image.asset->url,
      price,
      discount,
      description,
      category,
      rating,
      tags
    }
  `,
    { id }
  );
}

export async function getFeaturedProducts() {
  return client.fetch(`
    *[_type == "product"] | order(rating desc)[0...8] {
      _id, id, name, "imageUrl": image.asset->url, price, discount, category, rating, tags
    }
  `);
}

export async function getRecommendedProducts(currentProductId: string) {
  return client.fetch(
    `
    *[_type == "product" && _id != $currentProductId] | order(rating desc)[0...8] {
      _id, id, name, "imageUrl": image.asset->url, price, discount, category, rating, tags
    }
  `,
    { currentProductId }
  );
}

export async function getReviews(productId: string) {
  return client.fetch(
    `
    *[_type == "review" && productId == $productId] | order(createdAt desc) {
      _id,
      rating,
      comment,
      userName,
      createdAt
    }
  `,
    { productId }
  );
}

export async function submitReview(
  productId: string,
  review: { rating: number; comment: string; userName: string }
) {
  return client.create({
    _type: "review",
    productId,
    rating: review.rating,
    comment: review.comment,
    userName: review.userName,
    createdAt: new Date().toISOString(),
  });
}
