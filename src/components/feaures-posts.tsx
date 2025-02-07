"use client"

import Image from "next/image"
import { FaClock, FaComment, FaChevronRight, FaHeart, FaEye } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const FeaturedPosts = () => {
  const router = useRouter()
  const posts = [
    {
      id: 1,
      image: "post1.png",
      tags: ["Fashion", "Accessories", "Trends"],
      title: "The Best Spring Styles for Men (Trendy and Comfortable)",
      description:
        "Explore the latest fashion trends for men this spring. From casual wear to formal, discover how to stay stylish and comfortable.",
      date: "22 April 2021",
      comments: "10 Comments",
      likes: 245,
      views: 1200,
    },
    {
      id: 2,
      image: "post2.png",
      tags: ["Casual Wear", "Style Tips", "Outfit Ideas"],
      title: "Must-Have Accessories for Women in 2023",
      description:
        "Discover the essential accessories every woman needs this year to elevate her style. From bags to jewelry, we've got you covered.",
      date: "15 May 2023",
      comments: "15 Comments",
      likes: 312,
      views: 1500,
    },
    {
      id: 3,
      image: "post3.png",
      tags: ["Kids", "Trendy", "Seasonal Picks"],
      title: "Top Summer Outfit Ideas for Kids",
      description:
        "Keep your kids looking stylish and feeling cool this summer with our top outfit picks for every occasion.",
      date: "5 June 2022",
      comments: "8 Comments",
      likes: 178,
      views: 950,
    },
  ]

  const handlePostClick = (postId: number) => {
    router.push(`/blog/${postId}`)
  }

  return (
    <div className="mt-32 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <h3 id="blog" className="text-blue-600 text-lg font-bold uppercase tracking-wide">
          Trending Articles
        </h3>
        <h2 className="text-4xl font-bold mt-2 mb-4">Featured Posts</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Stay up to date with the latest trends and tips in fashion, accessories, and more for Men, Women, and Kids.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full cursor-pointer"
            onClick={() => handlePostClick(post.id)}
          >
            <div className="relative">
              <div className="absolute top-4 left-4 bg-red-500 text-white py-1 px-2 text-sm font-bold rounded-full">
                NEW
              </div>
              <Image src={`/${post.image}`} alt="post" width={400} height={250} className="w-full h-48 object-cover" />
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-blue-600 bg-blue-100 py-1 px-2 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-blue-500" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <FaComment className="mr-2 text-green-500" />
                    <span>{post.comments}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center">
                    <FaHeart className="mr-2 text-red-500" />
                    <span>{post.likes} likes</span>
                  </div>
                  <div className="flex items-center">
                    <FaEye className="mr-2 text-purple-500" />
                    <span>{post.views} views</span>
                  </div>
                </div>

                <div className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  Read Full Article
                  <FaChevronRight className="ml-2" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedPosts

