import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Server_url from "../Utils/server_url";
import Comments from "./Comments";
import Loader from "./Loader/Loader";
import Navbar from "./Navbar";
import DOMPurify from "dompurify";
import st from "./SingleBlog.module.css"
import "react-quill/dist/quill.snow.css";


import { FaUser } from "react-icons/fa";
import LikeButton from "./LikeButton";
import { BiLoaderCircle } from "react-icons/bi";
const SingleBlog = () => {
  const Token = sessionStorage.getItem("token");
  const [comments, setComments] = useState(null);

  const [isPostingComment, setIsPostingComment] = useState(false);
  const [blog, setBlog] = useState(null);
  const username = sessionStorage.getItem("username");
  const params = useParams();
  useEffect(() => {
    axios
      .get(`${Server_url}api/blogs/getblogbyId/${params.id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        setBlog(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function addComment(e) {
    const desc = e.target[0].value;
    // send blogId and description
    if (!desc) {
      return;
    }
    const data = { description: desc, blogId: params.id };
    setIsPostingComment(true);
    axios
      .post(`${Server_url}api/comments/add`, data, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        e.target[0].value = "";
        setComments(res.data.newComment);
        setIsPostingComment(false);
      })
      .catch((w) => {
        console.log(w);
        setIsPostingComment(false);
      });
  }
  return (
    <>
      <Navbar />
      {blog === null && <Loader />}
      {blog && (
        <div className="border-2 md:w-4/5 m-auto md:mt-5 mt-2 p-4 my-4 shadow-md rounded-md">
          <div className="py-2 px-4 border-b-2">
            <div className="flex items-center justify-between gap-x-4">
              <div>
                <h3 className="block mt-px text-indigo-600 font-bold text-2xl  text-md ">
                  {blog.title}
                </h3>
                <div className="mt-3 flex items-center gap-4 text-gray-700">
                  <LikeButton blogId={blog.id} likes={blog.likes} />
                </div>
              </div>
              <div className="">
                <div className=" justify-center items-center gap-x-3 flex text-gray-700 text-md font-semibold">
                  <span className="text-sm text-gray-600 font-medium">
                    <FaUser />
                  </span>
                  <span>{username}</span>
                </div>

                <p className="block mt-px text-gray-600 text-xs">
                  {blog.createdAt.split("T")[0]}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div
              className={`${st.main_class} text-gray-600 mt-2  border-b-2 border-gray-300`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.Description),
              }}
            ></div>
          </div>
          <Comments
            bid={params.id}
            setComments={setComments}
            comments={comments}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addComment(e);
            }}
            className="mt-5 justify-between bottom-0 sm:flex flex-row items-center  "
          >
            <input
              disabled={isPostingComment}
              placeholder="Comment"
              className="text-gray-500 w-full p-3 border-b-2 border-gray-300 outline-none focus:border-2 focus:border-indigo-600"
            />
            <button className=" mt-3 px-5 py-3 rounded-md  hover:bg-gray-200 active:bg-black-700 duration-150 outline-none shadow-md focus:shadow-none  sm:mt-0 sm:ml-3 sm:w-auto">
              {isPostingComment ? (
                <BiLoaderCircle className="animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                  fill="#4481eb"
                >
                  <path d="M16,464,496,256,16,48V208l320,48L16,304Z" />
                </svg>
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SingleBlog;
