import moment from "moment";
import { Fragment } from "react";

const PostDetail = ({ post }) => {
  console.log(post);

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <Fragment key={i}>{item}</Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <Fragment key={i}>{item}</Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <Fragment key={i}>{item}</Fragment>
            ))}
          </h4>
        );
      case "image":
        return <img key={index} alt={obj.title} height={obj.height} width={obj.width} src={obj.src} />;
      default:
        return modifiedText;
    }
  };

  return (
    <div className=" bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className=" relative overflow-hidden shadow-md mb-6 ">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className=" object-top  h-full w-full  shadow-lg rounded-t-lg first-letter: first-line:"
        />
      </div>
      <div className="flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto ">
        <img alt={post.author.name} height="40" width="40" className="rounded-lg align-middle" src={post.author.photo.url}></img>
        <p className="ml-2 text-gray-700 font-sans inline align-middle text-lg">{post.author.name}</p>
      </div>
      <div className="font-medium text-gray-700 flex justify-center first-letter: lg:pt-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
        <span>{moment(post.createdAt).format("MMMM DD, YYYY")}</span>
      </div>
      <h1 className=" pt-4 text-center mb-8 text-3xl font-semibold">{post.title}</h1>
      <p>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </p>
    </div>
  );
};

export default PostDetail;
