"use client"

import { useState, useEffect } from "react"
import { getReviews, submitReview } from "@/sanity/lib/client"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Review {
  _id: string
  rating: number
  comment: string
  userName: string
  createdAt: string
}

export default function ReviewsAndRatings({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState(0)
  const [newReview, setNewReview] = useState({ rating: 0, comment: "", userName: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchReviews() {
      const fetchedReviews = await getReviews(productId)
      setReviews(fetchedReviews)
      const avgRating =
        fetchedReviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / fetchedReviews.length
      setAverageRating(avgRating || 0)
    }
    fetchReviews()
  }, [productId])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    try {
      const submittedReview = await submitReview(productId, newReview)
      setReviews([submittedReview, ...reviews])
      setNewReview({ rating: 0, comment: "", userName: "" })
      // Update average rating
      const newAvgRating = (averageRating * reviews.length + submittedReview.rating) / (reviews.length + 1)
      setAverageRating(newAvgRating)
    } catch (err) {
      setError("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      <div className="mb-8 flex items-center">
        <div className="mr-4">
          <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${
                  star <= Math.round(averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">Based on {reviews.length} reviews</p>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block mb-1 font-medium">
              Name
            </label>
            <Input
              type="text"
              id="userName"
              value={newReview.userName}
              onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="rating" className="block mb-1 font-medium">
              Rating
            </label>
            <select
              id="rating"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select a rating</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} stars
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="comment" className="block mb-1 font-medium">
              Comment
            </label>
            <Textarea
              id="comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={4}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Reviews</h3>
        {reviews.map((review) => (
          <div key={review._id} className="mb-6 border-b pb-4">
            <div className="flex items-center mb-2">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="font-semibold">{review.userName}</p>
            </div>
            <p className="text-gray-700 mt-2">{review.comment}</p>
            <p className="text-sm text-gray-500 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

