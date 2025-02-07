import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";

export default function Hero() {
  return (
    <div className="text-center py-10">
      <h2 className="text-[#737373] font-bold text-[16px] mt-5">
        OUR COLLECTION
      </h2>
      <h1 className="text-[46px] font-bold mt-3 text-[#252B42]">
        Discover Products That Inspire
      </h1>
      <p className="text-[#252B42] mt-5 font-bold text-[14px] flex justify-center items-center gap-1">
        Home <FiChevronRight className="text-[#BDBDBD] text-[25px]" />{" "}
        <span className="text-[#737373]">Team</span>
      </p>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
        {/* First Image */}
        <div className="md:col-span-2 md:row-span-2 h-[500px] md:h-full">
          <Image
            src="/team1.png"
            alt="Our Team in Action"
            height={530}
            width={700}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Second row images - 2 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="h-[250px] md:h-[260px]">
            <Image
              src="/team2.png"
              alt="Brainstorming Ideas"
              height={260}
              width={361}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="h-[250px] md:h-[260px]">
            <Image
              src="/post3.png"
              alt="Team Collaboration"
              height={260}
              width={361}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>

        {/* Third row images - 2 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="h-[250px] md:h-[260px]">
            <Image
              src="/team4.png"
              alt="UI/UX Development"
              height={260}
              width={361}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="h-[250px] md:h-[260px]">
            <Image
              src="/team5.png"
              alt="Customer Engagement"
              height={260}
              width={361}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
