import Image from "next/image";
import { FaClock, FaComment, FaChevronRight } from "react-icons/fa";
import React from "react";

const FeaturedPosts = () => {
  const posts = [
    {
      image: "post1.png",
      tags: ["Fashion", "Accessories", "Trends"],
      title: "The Best Spring Styles for Men (Trendy and Comfortable)",
      description:
        "Explore the latest fashion trends for men this spring. From casual wear to formal, discover how to stay stylish and comfortable.",
      date: "22 April 2021",
      comments: "10 Comments",
    },
    {
      image: "post2.png",
      tags: ["Casual Wear", "Style Tips", "Outfit Ideas"],
      title: "Must-Have Accessories for Women in 2023",
      description:
        "Discover the essential accessories every woman needs this year to elevate her style. From bags to jewelry, we've got you covered.",
      date: "15 May 2023",
      comments: "15 Comments",
    },
    {
      image: "post3.png",
      tags: ["Kids", "Trendy", "Seasonal Picks"],
      title: "Top Summer Outfit Ideas for Kids",
      description:
        "Keep your kids looking stylish and feeling cool this summer with our top outfit picks for every occasion.",
      date: "5 June 2022",
      comments: "8 Comments",
    },
  ];

  return (
    <div className="mt-32">
      <div className="text-center mb-20">
        <h3
          id="blog"
          className="text-[#23A6F0] text-[14px] font-bold uppercase tracking-wide"
        >
          Trending Articles
        </h3>
        <h2 className="text-[#252B42] text-[40px] font-bold">Featured Posts</h2>
        <p className="text-[#737373] text-[14px] max-w-2xl mx-auto">
          Stay up to date with the latest trends and tips in fashion,
          accessories, and more for Men, Women, and Kids.
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-8">
        {posts.map((post, index) => (
          <div
            key={index}
            className="max-w-xs sm:max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 flex flex-col items-center"
          >
            <div className="relative group">
              <div className="absolute top-4 left-4 bg-[#E74040] text-white py-1 px-2 text-[14px] font-bold h-[24px] w-[58px] flex items-center justify-center">
                NEW
              </div>

              <Image
                src={`/${post.image}`}
                alt="post"
                width={348}
                height={300}
                className="w-full h-72 object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="p-4 text-center">
              <div className="flex justify-center space-x-3 mb-3">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-[#8EC2F2] py-1 px-3 rounded-full text-[12px] bg-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-[20px] text-[#252B42] mt-4">{post.title}</h3>

              <p className="text-[#737373] text-[14px] mt-2">
                {post.description}
              </p>

              <div className="flex justify-between items-center mt-4 text-[12px] text-[#737373]">
                <div className="flex items-center space-x-2">
                  <FaClock className="w-4 h-4 text-[#23A6F0]" />
                  <span>{post.date}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <FaComment className="w-4 h-4 text-[#23856D]" />
                  <span className="text-[#737373]">{post.comments}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-start">
                <button className="text-[#737373] text-sm font-bold py-2 px-4 rounded-md bg-transparent hover:bg-[#2DC071] hover:text-white transition-all duration-300 flex items-center space-x-2">
                  <span>Read Full Article</span>
                  <FaChevronRight className="inline-block text-[#737373] group-hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
