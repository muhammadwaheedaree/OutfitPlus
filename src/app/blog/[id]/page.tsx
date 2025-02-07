"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  FaClock,
  FaComment,
  FaArrowLeft,
  FaBookmark,
  FaShare,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaHeart,
  FaEye,
  FaChevronUp,
} from "react-icons/fa"

const posts = [
  {
    id: 1,
    image: "/post1.png",
    tags: ["Fashion", "Accessories", "Trends"],
    title: "The Best Spring Styles for Men (Trendy and Comfortable)",
    description:
      "Explore the latest fashion trends for men this spring. From casual wear to formal, discover how to stay stylish and comfortable.",
    date: "22 April 2021",
    comments: "10 Comments",
    likes: 245,
    views: 1200,
    content: `
      <p>Spring is here, and it's time to refresh your wardrobe with the latest trends that combine style and comfort. This season, men's fashion is all about versatility, bold colors, and relaxed fits. Let's dive into the best spring styles that will keep you looking sharp and feeling great.</p>

      <h2>1. Oversized Tailoring</h2>
      <p>Gone are the days of skin-tight suits. This spring, embrace the comfort of oversized tailoring. Opt for relaxed-fit blazers and trousers in lightweight fabrics like linen or cotton blends. Pair them with a crisp white t-shirt for a casual yet polished look.</p>

      <h2>2. Pastel Power</h2>
      <p>Inject some color into your wardrobe with pastel shades. Soft pinks, mint greens, and baby blues are perfect for the season. Try a pastel polo shirt with neutral chinos for an effortless spring outfit.</p>

      <h2>3. Statement Prints</h2>
      <p>Bold prints are making a comeback. From floral patterns to geometric designs, don't be afraid to make a statement. A printed short-sleeve shirt paired with solid-colored shorts is an excellent choice for warmer days.</p>

      <h2>4. Elevated Athleisure</h2>
      <p>The athleisure trend continues to evolve. This spring, look for premium materials and sleek designs. A well-fitted tracksuit in a luxe fabric can take you from a casual lunch to an evening out with friends.</p>

      <h2>5. Sustainable Fashion</h2>
      <p>Eco-friendly fashion is more than just a trend; it's becoming a necessity. Invest in pieces made from sustainable materials like organic cotton, recycled polyester, or Tencel. Many brands now offer stylish options that are kind to the planet.</p>

      <p>Remember, the key to mastering spring fashion is to balance comfort with style. Don't be afraid to experiment with different combinations and find what works best for you. With these trends in mind, you're ready to step into spring with confidence and flair.</p>
    `,
  },
  {
    id: 2,
    image: "/post2.png",
    tags: ["Casual Wear", "Style Tips", "Outfit Ideas"],
    title: "Must-Have Accessories for Women in 2023",
    description:
      "Discover the essential accessories every woman needs this year to elevate her style. From bags to jewelry, we've got you covered.",
    date: "15 May 2023",
    comments: "15 Comments",
    likes: 312,
    views: 1500,
    content: `
      <p>Accessories are the secret weapon in any fashion-forward woman's arsenal. They have the power to transform a simple outfit into a stunning ensemble. As we navigate through 2023, certain accessories have emerged as must-haves for every woman who wants to stay on top of her style game. Let's explore the essential accessories that will elevate your look this year.</p>

      <h2>1. Oversized Sunglasses</h2>
      <p>Make a statement with oversized sunglasses. Whether you're going for a retro vibe or a modern edge, these shades add instant glamour to any outfit while providing excellent sun protection.</p>

      <h2>2. Chunky Chain Necklaces</h2>
      <p>Bold, chunky chain necklaces are having a moment. They add a touch of edginess to both casual and formal outfits. Opt for gold-toned pieces for a luxe look, or try silver for a cooler vibe.</p>

      <h2>3. Mini Bags</h2>
      <p>Small but mighty, mini bags continue to dominate the accessory scene. These compact carriers are perfect for essentials and add a cute, playful element to your outfit.</p>

      <h2>4. Statement Earrings</h2>
      <p>From colorful hoops to architectural designs, statement earrings are a must-have. They can instantly elevate a simple t-shirt and jeans combo or complement an evening dress.</p>

      <h2>5. Wide-Brim Hats</h2>
      <p>Chic and practical, wide-brim hats are perfect for sunny days. They add a touch of mystery and sophistication to your look while protecting you from the sun.</p>

      <p>Remember, the key to accessorizing is balance. Choose pieces that complement your outfit without overwhelming it. With these must-have accessories in your collection, you'll be ready to make a stylish statement throughout 2023.</p>
    `,
  },
  {
    id: 3,
    image: "/post3.png",
    tags: ["Kids", "Trendy", "Seasonal Picks"],
    title: "Top Summer Outfit Ideas for Kids",
    description:
      "Keep your kids looking stylish and feeling cool this summer with our top outfit picks for every occasion.",
    date: "5 June 2022",
    comments: "8 Comments",
    likes: 178,
    views: 950,
    content: `
      <p>Summer is the perfect time for kids to express their personality through fashion while staying comfortable in the heat. This season's trends for children's wear focus on bright colors, playful patterns, and easy-to-wear styles. Let's explore some top summer outfit ideas that will keep your kids looking cool and feeling great.</p>

      <h2>1. Colorful Coord Sets</h2>
      <p>Coordinated sets are a hit this summer. Think matching shorts and shirts in vibrant prints or solid colors. These sets are not only stylish but also make dressing up a breeze for both parents and kids.</p>

      <h2>2. Breezy Sundresses</h2>
      <p>For girls, lightweight sundresses in floral prints or cheerful solid colors are perfect for hot days. Look for styles with adjustable straps or smocked bodices for added comfort.</p>

      <h2>3. Graphic Tees and Shorts</h2>
      <p>Boys will love graphic tees paired with comfortable shorts. Opt for designs featuring their favorite characters or fun slogans. Pair with cargo shorts or lightweight denim for a casual, everyday look.</p>

      <h2>4. Playful Rompers</h2>
      <p>One-piece rompers are ideal for active kids. Choose styles in breathable fabrics like cotton or linen. Patterns like stripes, polka dots, or tropical prints add a fun summer vibe.</p>

      <h2>5. UV-Protective Swimwear</h2>
      <p>For beach or pool days, invest in UV-protective swimwear. Rash guards and swim shorts for boys, and one-piece suits or tankinis for girls, offer style and sun protection.</p>

      <p>When choosing summer outfits for kids, prioritize comfort, durability, and ease of movement. Opt for breathable fabrics and loose fits to keep them cool. With these outfit ideas, your kids will be ready for all their summer adventures in style!</p>
    `,
  },
]

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === Number.parseInt(params.id))
  const [mounted, setMounted] = useState(false)
  const [showShareIcons, setShowShareIcons] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post?.likes || 0)
  const [isReading, setIsReading] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])
  const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 8])

  useEffect(() => {
    setMounted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      setIsReading(scrollPosition > windowHeight * 0.2 && scrollPosition < documentHeight - windowHeight * 1.2)
      setShowScrollTop(scrollPosition > windowHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!post) {
    return <div>Post not found</div>
  }

  if (!mounted) {
    return null
  }

  const shareOnSocialMedia = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(post.title)
    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "instagram":
        shareUrl = "https://www.instagram.com/"
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`
        break
    }

    window.open(shareUrl, "_blank")
  }

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1)
    } else {
      setLikes(likes - 1)
    }
    setLiked(!liked)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative">
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${post.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity,
          scale,
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: blurValue.get() ? `blur(${blurValue.get()}px)` : "none",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
      >
        <nav className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            Back to Featured Posts
          </Link>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 relative rounded-lg overflow-hidden shadow-2xl"
        >
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-[400px] sm:h-[500px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h1 className="text-white text-3xl sm:text-4xl font-bold">{post.title}</h1>
          </div>
        </motion.div>

        <header className="mb-12 bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <div className="flex flex-wrap items-center text-gray-600 mb-4">
            <div className="flex items-center mr-6 mb-2 sm:mb-0">
              <FaClock className="mr-2 text-blue-500" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center mr-6 mb-2 sm:mb-0">
              <FaComment className="mr-2 text-green-500" />
              <span>{post.comments}</span>
            </div>
            <div className="flex items-center mr-6 mb-2 sm:mb-0">
              <FaHeart className={`mr-2 ${liked ? "text-red-500" : "text-gray-400"}`} />
              <span>{likes}</span>
            </div>
            <div className="flex items-center">
              <FaEye className="mr-2 text-purple-500" />
              <span>{post.views} views</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <motion.article
          ref={contentRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="prose prose-lg max-w-none bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-lg shadow-lg"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </motion.article>

        <div className="mt-12 border-t border-gray-200 pt-6 bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <motion.button
                onClick={handleLike}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center ${liked ? "text-red-500" : "text-gray-600"} hover:text-red-600 transition-colors duration-200`}
              >
                <FaHeart className="mr-2" />
                {liked ? "Liked" : "Like"}
              </motion.button>
              <div className="relative">
                <motion.button
                  onClick={() => setShowShareIcons(!showShareIcons)}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <FaShare className="mr-2" />
                  Share
                </motion.button>
                <AnimatePresence>
                  {showShareIcons && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg p-2 flex space-x-2"
                    >
                      <motion.button
                        onClick={() => shareOnSocialMedia("facebook")}
                        whileHover={{ scale: 1.1 }}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      >
                        <FaFacebookF className="text-xl" />
                      </motion.button>
                      <motion.button
                        onClick={() => shareOnSocialMedia("instagram")}
                        whileHover={{ scale: 1.1 }}
                        className="text-pink-600 hover:text-pink-800 transition-colors duration-200"
                      >
                        <FaInstagram className="text-xl" />
                      </motion.button>
                      <motion.button
                        onClick={() => shareOnSocialMedia("whatsapp")}
                        whileHover={{ scale: 1.1 }}
                        className="text-green-600 hover:text-green-800 transition-colors duration-200"
                      >
                        <FaWhatsapp className="text-xl" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <FaBookmark className="mr-2" />
                Save
              </motion.button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link href={`/blog/${relatedPost.id}`} key={relatedPost.id} className="group">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-md overflow-hidden transition-transform duration-300 h-full flex flex-col"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-200">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{relatedPost.description}</p>
                      </div>
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <FaClock className="mr-2" />
                        <span>{relatedPost.date}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            <FaArrowLeft className="mr-2" />
            Back to All Articles
          </Link>
        </div>
      </motion.div>

      <AnimatePresence>
        {isReading && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center"
          >
            <div className="text-sm text-gray-600">Currently reading: {post.title}</div>
            <div className="flex space-x-4">
              <button onClick={handleLike} className={`text-sm ${liked ? "text-red-500" : "text-gray-600"}`}>
                <FaHeart className="inline mr-1" /> {likes}
              </button>
              <button onClick={() => setShowShareIcons(!showShareIcons)} className="text-sm text-gray-600">
                <FaShare className="inline mr-1" /> Share
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-20 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <FaChevronUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

