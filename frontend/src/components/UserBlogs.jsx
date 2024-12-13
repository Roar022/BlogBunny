import { useEffect, useState } from "react";
import { FaHeart, FaUser } from "react-icons/fa";
import axios from "axios";
import Server_url from "../Utils/server_url";
import "./UserBlog.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader/Loader";
import DOMPurify from "dompurify";
import LikeButton from "./LikeButton";

export const UserBlogs = () => {
  const Token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username");
  const userId = sessionStorage.getItem("userId");
  const [blogs, setBlogs] = useState([]);
  const [noMatch, setNoMatch] = useState(null);
  const [matchArray, setMatchArray] = useState(null);
  const navigate = useNavigate();

  function findMatches(wordToMatch, blogs) {
    return blogs.filter((blog) => {
      let regex;
      try {
        regex = new RegExp(wordToMatch, "gi");
      } catch (e) {
        if (blog.title != null) {
          return blog.title;
        }
      }
      if (blog.title != null) {
        return blog.title.match(regex);
      }
    });
  }
  function handleSearch(e) {
    // console.log(e);
    const matchArray = findMatches(e.target.value, blogs);
    // console.log(matchArray);
    if (e.target.value.length > 0) {
      if (matchArray && matchArray.length === 0) {
        setNoMatch("no");
      } else {
        setMatchArray(matchArray);
        setNoMatch(null);
      }
    } else {
      setNoMatch(null);
      setMatchArray(blogs);
    }
  }

  function deletepost(e, pid) {
    // console.log(pid)
    const idLoad = toast.loading("Please wait, deleting post...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    axios
      .delete(`${Server_url}api/blogs/delete/${pid}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        // console.log(res)
        // if (res.data.status == "success") {
        //   toast.success("Post Deleted", {
        //     position: toast.POSITION.TOP_RIGHT,
        //     autoClose: 1000,
        //   });

        axios
          .get(`${Server_url}api/blogs/getuserblog`, {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          })
          .then((res) => {
            // console.log(res);
            //   setPosts(res.data.data);
            //   setMatchArray(res.data.data);
            setTimeout(
              function () {
                toast.update(idLoad, {
                  render: "Successfuly deleted the blog.",
                  type: "success",
                  isLoading: false,
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1000,
                });
              },
              [500]
            );
          })
          .catch((e) => {
            //   toast.error("Error deleting posts");
            setTimeout(
              function () {
                toast.update(idLoad, {
                  render: "Error deleting post.",
                  type: "error",
                  isLoading: false,
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1000,
                });
              },
              [500]
            );
            console.log(e);
          });
        // } else {
        // console.log("error")
        //   toast.error(res.data.message)
        // }
      })
      .catch((err) => {
        // toast.error("Error deleting posts");
        setTimeout(
          function () {
            toast.update(idLoad, {
              render: "Error deleting post.",
              type: "error",
              isLoading: false,
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          },
          [500]
        );
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get(`${Server_url}api/blogs/getuserblog`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setBlogs(res.data.blog);
        setMatchArray(res.data.blog);
      })
      .catch((e) => {
        //   toast.error("Error deleting posts");
        console.log(e);
      });
  }, []);

  return (
    <section className="">
      {!matchArray && !noMatch && <Loader />}
      <section className="h-[calc(100vh-90px)] overflow-auto py-2 overscroll-auto">
        {/* <section className="  community_background  py-2  overflow-auto overscroll-auto"> */}
        {matchArray && matchArray.length > 0 && (
          <div className="md:w-4/5 mx-auto justify-between border-b-2 border-indigo-500 items-center flex">
            <h3 className="m-4 text-indigo-600 text-3xl font-semibold sm:text-4xl">
              Your Blogs
            </h3>
            {
              <div className="relative w-2/5 bg-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute  top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  onChange={(e) => {
                    handleSearch(e);
                  }}
                  type="text"
                  placeholder="Search Posts"
                  className="w-full py-3 pl-12 pr-4 text-gray-500 border border-gray-500 rounded-md outline-none bg-transparent focus:border focus:border-indigo-600"
                />
              </div>
            }
          </div>
        )}
        <div className="max-w-screen-xl mx-auto  ">
          <div className="mt-12 flex justify-center ">
            <ul className="grid gap-8 sm:grid-cols-1 overflow-auto md:w-4/5 md:px-0 px-4 mx-1 md:mx-0  md:grid-cols-2">
              {matchArray && matchArray.length !== 0 && noMatch && (
                <span className="block text-gray-700 text-sm font-semibold">
                  No match found
                </span>
              )}
              {noMatch == null && matchArray && matchArray.length === 0 && (
                <div className=" text-indigo-600 text-3xl font-semibold sm:text-4xl text-center">
                  Create Your First Blog
                </div>
              )}
              {noMatch == null &&
                matchArray &&
                matchArray.length > 0 &&
                matchArray.map((item, idx) => (
                  <div
                    key={idx}
                    className="border-2  bg-white w-200px md:p-4 p-2 shadow-md rounded-md"
                  >
                    <div className="flex w-full justify-between border-b-2 border-gray-400 items-center gap-x-4">
                      <div className="w-1/4 truncate">
                        <div className=" text-gray-700 flex gap-2 items-center text-sm font-semibold">
                          <div>
                            <FaUser />
                          </div>
                          <div>{username}</div>
                        </div>

                        <div className=" mt-px text-gray-600 text-xs">
                          {item.createdAt.split("T")[0]}
                        </div>
                      </div>
                      <div className="w-2/4  text-indigo-700   font-bold text-lg flex gap-x-2  text-center">
                        <span className="m-auto truncate">{item.title}</span>
                      </div>
                      <div className="flex gap-x-4">
                        {userId === item.userId && (
                          <div
                            className="cursor-pointer w-1/4 text-end"
                            onClick={(e) => {
                              navigate(`/dashboard/edit?id=${item.id}`);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                              <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                            </svg>
                          </div>
                        )}

                        {userId === item.userId && (
                          <div
                            className="cursor-pointer w-1/4 text-end"
                            onClick={(e) => deletepost(e, item.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="ml-auto"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="shadow-inner text-gray-600 mt-2 max-h-[300px]  overflow-hidden border-b-2 border-gray-300">
                        <Link
                          to={item.id}
                          className=""
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(item.Description),
                          }}
                        ></Link>
                      </div>
                      <div className="mt-3 flex items-center gap-4 text-gray-700">
                        <LikeButton blogId={item.id} likes={item.likes} />
                      </div>
                    </div>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </section>
    // <div>hello</div>
  );
};
