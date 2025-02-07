import { createClient } from "@sanity/client";
import fetch from "node-fetch";

const client = createClient({
  projectId: "6jutbhfg",
  dataset: "production",
  token:
    "sk0xgQATgx1dd1uQFYxmOhVCpRIBxtPtPwhiq89AcuSCMaR6HmomdEiigqBzkSZohIFczGkw9RP3jLGWntlO07vG7tfGH3G898by9BPx24xxkkxVKQbBrN2hsdqdTi0DJfE0uyyyhPgMpUCQ8FQwnk6WS6fNSfWNgtt2ywUcNuqrVw4TK6QA",
  useCdn: false,
  apiVersion: "2021-03-25",
});

async function uploadImageToSanity(imageUrl) {
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();

  return client.assets.upload("image", buffer, {
    filename: imageUrl.split("/").pop(),
  });
}

async function migrateToSanity() {
  try {
    const response = await fetch("http://127.0.0.1:3000/api/products");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();
    console.log(`Fetched ${products.length} products from API`);

    for (const product of products) {
      try {
        // Upload image to Sanity
        const imageAsset = await uploadImageToSanity(product.imageUrl);

        const result = await client.create({
          _type: "product",
          id: product.id,
          name: product.name,
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset._id,
            },
          },
          price: parseFloat(product.price.replace("$", "")),
          discount: parseFloat(product.discount.replace("%", "")),
          description: product.description,
          category: product.category,
          rating: product.rating,
        });
        console.log(`Created product with ID: ${result._id}`);
      } catch (err) {
        console.error(`Failed to create product: ${product.name}`, err);
      }
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Error during migration:", error);
  }
}

migrateToSanity();
