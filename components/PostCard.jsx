import moment from "moment";
import Link from "next/link";
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md pb-80 mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="object-top absolute h-full w-full object-cocver shadow-lg rounded-t-lg lg:rounded-lg"
        />
      </div>
      <Link href={`/post/${post.slug}`}>
        <h1 className=" transition duration-1000 text-center mb-8 cursor-pointer text-3xl font-semibold hover:translate-y-1 hover:text-gray-500">
          {post.title}
        </h1>
      </Link>
      <div className="block lg:flex text-center items-center justify-center mb-8 w-full" style={{flexDirection:"column"}}>
        <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto ">
          <img alt={post.author.name} height="40" width="40" className="rounded-lg align-middle" src={post.author.photo.url}></img>
          <p className="ml-2 text-gray-700 font-sans inline align-middle text-lg">{post.author.name}</p>
        </div>
        <div className="font-medium text-gray-700 pt-4 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>
          <span>
            {moment(post.createdAt).format("MMMM DD, YYYY")}
          </span>
        </div>
      </div>
          <p className=" text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
            {post.excerpt}
          </p>
          <div className=" text-center">
            <Link href={`/post/${post.slug}`}>
            <span className="transition duration-1000 transform hover:translate-y-2 hover:text-gray-900 inline-block text-gray-800 font-semibold bg-gray-300 rounded-full p-3"> Read More</span>
            </Link>
          </div>
    </div>
  );
};

export default PostCard;
