import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { getRecentPosts, getSimilarPosts } from "../services";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((data) => setRelatedPosts(data));
    } else {
      getRecentPosts().then((data) => setRelatedPosts(data));
    }
  }, [slug]);
  return (
    <div className="bg-white p-8 mb-8 rounded-lg">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4 ">{slug ? "Related Posts" : "Recent Posts"}</h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="flex mb-4 w-full items-center">
          <div className="w-16 flex-none">
            <img alt={post.title} src={post.featuredImage.url} className="rounded-lg" />
          </div>
          <div className=" flex-auto ml-4">
            <p className="text-gray-500 text-xs ">{moment(post.createdAt).format("MMMM DD, YYYY")}</p>
            <Link href={`/post/${post.slug}`} key={post.title} className={"text-md text-gray-700"}>
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
