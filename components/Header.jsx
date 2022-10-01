import React, { useContext } from "react";
import Link from "next/link";

const Header = () => {
  const categories = [
    { name: "category1", slug: "dkddjkdjdkdj" },
    { name: "category2", slug: "sdlkdsldksldskd" },
    { name: "category3", slug: "dlafklnsvmmcxv" },
  ];
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">Blog App</span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents"></div>
        {
            categories.reverse().map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">{category.name}</span>
                </Link>
            ))
        }
      </div>
    </div>
  );
};

export default Header;
