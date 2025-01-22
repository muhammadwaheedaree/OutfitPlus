import { Suspense } from "react"
import { getPaginatedProducts, getCategories } from "@/sanity/lib/client"
import Cards from "@/components/product-components/cards"
import FeatureProducts from "@/components/feature-products"
import Company from "@/components/product-components/company"
import Header from "@/components/header"
import Footer from "@/components/shop-components/footer"

export default async function ProductPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; search?: string }
}) {
  const page = Number.parseInt(searchParams.page || "1", 10)
  const category = searchParams.category || "All"
  const searchQuery = searchParams.search || ""
  const perPage = 8

  const [productsData, categoriesData] = await Promise.all([
    getPaginatedProducts(page, perPage, category === "All" ? undefined : [category], searchQuery),
    getCategories(),
  ])

  const categories = ["All", ...categoriesData.map((cat: { name: string }) => cat.name)]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <Cards
              initialProducts={productsData.products}
              totalProducts={productsData.totalProducts}
              initialPage={page}
              initialCategory={category}
              categories={categories}
              initialSearchQuery={searchQuery}
            />
          </Suspense>
        </div>
        <FeatureProducts />
      </main>
      <Company />
      <Footer />
    </div>
  )
}

