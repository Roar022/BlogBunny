import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaHeart } from "react-icons/fa";
import DOMPurify from "dompurify";

import { FaUser } from "react-icons/fa";
import Server_url from "../../Utils/server_url";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader/Loader";
import Comments from "../../components/Comments";
import { BiLoaderCircle } from "react-icons/bi";
import LikeButton from "../../components/LikeButton";
const ExploreBlog = () => {
  const Token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");
  const [blog, setBlog] = useState(null);
  const username = sessionStorage.getItem("username");
  const params = useParams();
  const [comments, setComments] = useState(null);
  const [isPostingComment, setIsPostingComment]= useState(false);
  useEffect(() => {
    axios
      .get(`${Server_url}api/blogs/getblogbyId/${params.exid}`)
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
    if(!desc){
      return;
    }
    // send blogId and description
    const data = { description: desc, blogId: params.exid };
    setIsPostingComment(true)
    axios
      .post(`${Server_url}api/comments/add`, data, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        e.target[0].value = "";
        console.log(res);
           
        setIsPostingComment(false);
        //   if (res.data.status == "success") {
        // let newar = posts.map((item) => {
        //   if (item.postId == comm) {
        //     return { ...item, comments: res.data.data };
        //   } else {
        //     return item;
        //   }
        // });
        setComments(res.data.newComment)
        console.log(res);
        // setPosts(newar);
        // setMatchArray(newar);
        //   } else {
        // toast.error(res.data.message)
        //   }
      })
      .catch((w) => {
        //   toast.error("Error adding comment");
        setIsPostingComment(false);
        console.log(w);
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
                {userId && <div className="mt-3 flex items-center gap-4 text-gray-700">
                <LikeButton blogId={blog.id} likes=  {blog.likes} />
                 
                 
                </div>}
              </div>
              <div className="">
                {userId && <div className=" justify-center items-center gap-x-3 flex text-gray-700 text-md font-semibold">
                  <span className="text-sm text-gray-600 font-medium">
                    <FaUser />
                  </span>
                  <span>{username}</span>
                </div>}

                <p className="block mt-px text-gray-600 text-xs">
                  {blog.createdAt.split("T")[0]}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div
              className="text-gray-600 mt-2 border-b-2 border-gray-300"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.Description),
              }}
            ></div>
          </div>
          {userId  && <Comments bid={params.exid} setComments={setComments} comments={comments} />}
          {userId &&  <form
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
             {isPostingComment? (<BiLoaderCircle className="animate-spin" />)  : <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 512 512"
                fill="#4481eb"
              >
                <path d="M16,464,496,256,16,48V208l320,48L16,304Z" />
              </svg>}
            </button>
          </form>}
        </div>
      )}
    </>
  );
};

export default ExploreBlog;
