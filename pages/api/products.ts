import type { NextApiRequest, NextApiResponse } from "next";
import { getPaginatedProducts } from "@/sanity/lib/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page = "1", perPage = "8", categories, search } = req.query;

  try {
    const result = await getPaginatedProducts(
      Number(page),
      Number(perPage),
      categories
        ? Array.isArray(categories)
          ? categories
          : [categories]
        : undefined,
      search ? String(search) : undefined
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
}
