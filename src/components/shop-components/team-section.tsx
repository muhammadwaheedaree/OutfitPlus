import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface TeamMember {
  name: string;
  profession: string;
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  image: string;
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Ayesha Khan",
      profession: "E-commerce Strategist",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
      },
      image: "/team-member2.png",
    },
    {
      name: "Ali Raza",
      profession: "Full Stack Developer",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
      },
      image: "/team-member1.png",
    },
    {
      name: "Sarah Ahmed",
      profession: "Digital Marketing Expert",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
      },
      image: "/team-member3.png",
    },
    {
      name: "Hamza Sheikh",
      profession: "UI/UX Designer",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
      },
      image: "/team-member1.png",
    },
    {
      name: "Maira Siddiqui",
      profession: "Content Specialist",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
      },
      image: "/team-member5.png",
    },
    {
      name: "Tahir Iqbal",
      profession: "SEO Analyst",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
      },
      image: "/team-member1.png",
    },
    {
      name: "Farah Nawaz",
      profession: "Product Manager",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
      },
      image: "/team-member7.png",
    },
    {
      name: "Zohaib Ali",
      profession: "Warehouse Manager",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
      },
      image: "/team-member1.png",
    },
    {
      name: "Asma Javed",
      profession: "Customer Support Lead",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#",
      },
      image: "/team-member9.png",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <h2 className="text-center text-[40px] font-bold mb-20 text-[#252B42]">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8 px-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            {/* Use Next.js Image component */}
            <Image
              src={member.image}
              alt={member.name}
              width={316}
              height={231}
              className="mx-auto"
            />
            <h3 className="mt-6 text-[16px] font-bold text-[#252B42]">
              {member.name}
            </h3>
            <p className="text-[#737373] text-[14px] mt-3">
              {member.profession}
            </p>
            <div className="flex justify-center mt-3 space-x-4">
              {/* Social media icons */}
              <Link href={member.social.facebook} className="text-[#23A6F0]">
                <FaFacebookF size={25} />
              </Link>
              <Link href={member.social.instagram} className="text-[#23A6F0]">
                <FaInstagram size={25} />
              </Link>
              <Link href={member.social.twitter} className="text-[#23A6F0]">
                <FaTwitter size={25} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="py-16 bg-[#FFFFFF] text-center mt-20">
        <h2 className="text-[40px] font-bold text-[#252B42]">
          Start your 14 days free trial
        </h2>
        <p className="text-[#737373] text-[14px] mt-4 mx-auto">
          Join our platform today to scale your e-commerce business <br />
          with the best team and tools.
        </p>
        <button className="mt-6 bg-[#23A6F0] rounded-md text-[14px] font-bold text-[#FFFFFF] px-8 py-4 hover:bg-blue-400">
          Try it free now
        </button>

        <div className="flex justify-center mt-10">
          <Link href="#" className="text-[#55ACEE] mx-2">
            <FaTwitter size={30} />
          </Link>
          <Link href="#" className="text-[#395185] mx-2">
            <FaFacebookF size={30} />
          </Link>
          <Link href="#" className="text-[#000000] mx-2">
            <FaInstagram size={30} />
          </Link>
          <Link href="#" className="text-[#0A66C2] mx-2">
            <FaLinkedinIn size={30} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
