import axios from "axios";
import React, { useEffect, useState } from "react";
import Server_url from "../Utils/server_url";
import {FaComments, FaUser} from "react-icons/fa"
import Loader2 from "./Loader2/Loader2";
import { toast } from "react-toastify";
const Comments = ({ bid, comments, setComments }) => {
  const Token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId")
  function showComments(bid) {
    axios
      .post(
        `${Server_url}api/comments/getcomment`,
        {
          blogId: bid,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        if(res.data.comments.length>0){

          setComments(res.data.comments);
        }
        else{
          setComments(null)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    showComments(bid);
  }, [comments]);
  function deleteComment(e, cid, bid) {
    const idLoad = toast.loading("Please wait, deleting comment...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    axios
      .delete(`${Server_url}api/comments/delete/${cid}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // if (res.data.status == "success") {
        //   toast.success("Comment Deleted", {
        //     position: toast.POSITION.TOP_RIGHT,
        //     autoClose: 1000,
        //   });
        axios
          .post(
            `${Server_url}api/comments/getcomment`,
            { blogId: bid },
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          )
          .then((res) => {
            //   setPosts(res.data.data);
            console.log(res);
            setComments(null);
            setTimeout(
              function () {
                toast.update(idLoad, {
                  render: "Comment Deleted.",
                  type: "success",
                  isLoading: false,
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1000,
                });
              },
              [500]
            );
            //   setMatchArray(res.data.data);
          })
          .catch((e) => {
            setTimeout(
              function () {
                toast.update(idLoad, {
                  render: "Some Error Occured.",
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
        //   toast.error(res.data.message)
        // }
      })
      .catch((e) => {
        // toast.error("Error deleting comment");
        console.log(e);
      });
  }
  

  return (
    <>
    
      {!comments&& (
        <Loader2 />
        // <ThreeDots
        //   height="50"
        //   width="50"
        //   radius="9"
        //   className="m-auto"
        //   color="#4481eb"
        //   ariaLabel="three-dots-loading"
        //   wrapperStyle={{}}
        //   wrapperClassName=""
        //   visible={true}
        // />
      )}
      {comments && comments!==null&& comments.length>0 && (
        <>
          <div className=" mx-3 flex gap-x-2 items-center text-gray-700 my-2  font-semibold">
            <div >
              <FaComments className="text-indigo-700 text-2xl font-bold" />
            </div>
            <div className="text-xl">
            Comments

            </div>
          </div>
          <ol className=" ">
            {comments.map((ite, id) => {
              return (
                <li key={id}>
                  <div className=" px-4 border mt-1">
                    <div className="flex  items-center gap-x-4">
                 
                        <div className="flex flex-col gap-x-4 justify-between">
                          <span className=" text-gray-700 flex  justify-center gap-3 items-center text-sm font-semibold">
                          <span className="text-sm text-gray-600 font-medium"><FaUser/></span>  {ite.name}
                          </span>
                          <p className="block mt-px text-gray-600  text-xs">
                            {ite.createdAt.split("T")[0]}
                          </p>
                        </div>
                 

                        <div className=" border-l-2 min-h-[50px] px-3 flex justify-center items-center border-gray-200 mt-px text-gray-600  text-xs">
                          {ite.description}
                        </div>
                      
                      
                     {(userId === ite.userId) && <div
                        className="ml-auto cursor-pointer"
                        onClick={(e) => deleteComment(e, ite.id, bid)}
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
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </div>}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
         
        </>
      )}

      <div></div>
    </>
  );
};

export default Comments;
