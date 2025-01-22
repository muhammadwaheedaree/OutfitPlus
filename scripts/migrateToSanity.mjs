import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '6jutbhfg',
  dataset: 'production',
  token: 'sk0xgQATgx1dd1uQFYxmOhVCpRIBxtPtPwhiq89AcuSCMaR6HmomdEiigqBzkSZohIFczGkw9RP3jLGWntlO07vG7tfGH3G898by9BPx24xxkkxVKQbBrN2hsdqdTi0DJfE0uyyyhPgMpUCQ8FQwnk6WS6fNSfWNgtt2ywUcNuqrVw4TK6QA',
  useCdn: false,
  apiVersion: '2021-03-25',
})

async function migrateToSanity() {
  try {
    // API endpoint ko check karein
    const response = await fetch('http://127.0.0.1:3000/api/products')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const products = await response.json()
    console.log(`Fetched ${products.length} products from API`)

    // Import products to Sanity
    for (const product of products) {
      try {
        const result = await client.create({
          _type: 'product',
          ...product
        })
        console.log(`Created product with ID: ${result._id}`)
      } catch (err) {
        console.error(`Failed to create product: ${product.name}`, err)
      }
    }

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Error during migration:', error)
  }
}

migrateToSanity()

