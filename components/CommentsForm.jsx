import { useEffect, useRef, useState } from "react";

import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
  }, []);

  const handleCommentSubmission = () => {
    setError(false);
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;
    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("email");
    }
    
    submitComment(commentObj)
    .then((res)=>{
      setShowSuccessMessage(true);
      setTimeout(()=>{
        setShowSuccessMessage(false);
      }, 3000);
    })
  };

  return (
    <div className=" bg-white p-8 rounded-lg pb-12 mb-8">
      <h3 className=" text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
      <div className="grid grid-cols-1  gap-4 mb-4">
        <textarea
          placeholder="Comment"
          name="comment"
          ref={commentEl}
          className="p-4 outline-none 2-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
        ></textarea>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type={"text"}
          ref={nameEl}
          placeholder="Name"
          name="name"
          className="py-2 px-4 outline-none 2-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
        ></input>
        <input
          type={"text"}
          ref={emailEl}
          placeholder="Email"
          name="email"
          className="py-2 px-4 outline-none 2-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100"
        ></input>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div>
          <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value={true} />
          <label className="text-gray-500 cursor-pointer pl-2" htmlFor="storeData">
            Save my e-mail and name for the next time I comment{" "}
          </label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">All fields are required</p>}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease-in-out bg-blue-700 rounded-lg p-4 hover:bg-indigo-500"
        >
          Post Comment
        </button>
        {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
      </div>
    </div>
  );
};

export default CommentsForm;
