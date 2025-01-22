"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onSelectCategory: (category: string) => void
}

export function CategoryFilter({ categories, activeCategory, onSelectCategory }: CategoryFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCategoryClick = (category: string) => {
    if (category === "All") {
      setSelectedCategories([])
      onSelectCategory("All")
      return
    }

    let newSelectedCategories: string[]
    if (selectedCategories.includes(category)) {
      newSelectedCategories = selectedCategories.filter((c) => c !== category)
    } else {
      newSelectedCategories = [...selectedCategories, category]
    }

    setSelectedCategories(newSelectedCategories)
    if (newSelectedCategories.length === 0) {
      onSelectCategory("All")
    } else {
      onSelectCategory(newSelectedCategories.join(","))
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-4">
        <Button
          variant={activeCategory === "All" ? "default" : "outline"}
          onClick={() => handleCategoryClick("All")}
          className="w-full md:w-auto mb-2 md:mb-0"
        >
          All Products
          {activeCategory === "All" && <Check className="ml-2 h-4 w-4" />}
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {categories
          .filter((cat) => cat !== "All")
          .map((category) => (
            <Button
              key={category}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              onClick={() => handleCategoryClick(category)}
              className="justify-between"
            >
              {category}
              {selectedCategories.includes(category) && <Check className="ml-2 h-4 w-4" />}
            </Button>
          ))}
      </div>
    </div>
  )
}

