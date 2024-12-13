import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { socket } from "../../Utils/socket";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar";
import ReactMarkdown from "react-markdown";

const CommunityBlog = () => {
  const params = useParams();
  const [showadd, setShowadd] = useState(false);
  const [blog, setBlog] = useState([]);
  const [valued, setValued] = useState({
    title: "",
    description: "",
  });
  const desc=useRef(null);
  const tit=useRef(null);
   
  function onChanged(e) {
    setValued((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    socket.emit("changed-blog",{
        title:tit.current.value,
        description:desc.current.value
    });
    // console.log(3);
  }
  async function onSubmit(event) {
    event.preventDefault();
    const idLoad = toast.loading("Editing Blog...", {
        position: toast.POSITION.TOP_RIGHT,
      });
    try {
        const data=await axios.put(`http://localhost:1337/api/blogs/${params.cid}`,{data:valued})
        console.log(data)
        const id = data.data.data.id;
        const t = data.data.data.attributes.title;
        const d = data.data.data.attributes.description;
        const blog={
            id:id,
            title:t,
            description:d
        }
        socket.emit("edit-blog", blog);
        setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Blog Edited",
            type: "success",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
    } catch (error) {
        setTimeout(
            function () {
              toast.update(idLoad, {
                render: "Invalid Credentials",
                type: "error",
                isLoading: false,
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000,
              });
            },
            [500]
          );
        console.log(error)
    }
    setShowadd(false);
  }
  useEffect(() => {
    // Define the event handler outside of the component function
    function handleNewBlogg(a) {
      setValued(a)
    }

    // Register the event listener when the component mounts
    socket.on("nchanged-blog", handleNewBlogg);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("nchanged-blog", console.log(56));
    };
  }, []);
  useEffect(() => {
    // Define the event handler outside of the component function
    function handleNewBlog(a) {
      setBlog(a);
      setValued({
        title:a.title,
        description:a.description
      })
    }

    // Register the event listener when the component mounts
    socket.on("edited-blog", handleNewBlog);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("edited-blog", console.log(56));
    };
  }, []);
  useEffect(() => {
    const fetchfn = async () => {
      const bl = await axios.get(
        `http://localhost:1337/api/blogs/${params.cid}`
      );
      const id = bl.data.data.id;
      const t = bl.data.data.attributes.title;
      const d = bl.data.data.attributes.description;
      const blg = {
        id: id,
        title: t,
        description: d,
      };
      setBlog(blg);
      setValued({
        title:t,
        description:d
      })
    };
    fetchfn();
    return () => {
      setBlog([]);
    };
  }, []);

  return (
    <>
    <Navbar/>
    <div className="m-8 border-2 border-indigo-700 h-full p-8">
      <h1 className="text-blue-950 font-medium text-2xl border-b-2 border-gray-600 pb-2 mb-8">{blog.title}</h1>
      {/* <h4 className="text-gray-600">{blog.description}</h4> */}
      {/* <div
              className="text-gray-600 mt-2 border-b-2 border-gray-300"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.description),
              }}
            ></div> */}
            <ReactMarkdown>{blog.description}</ReactMarkdown>
      <button onClick={()=>{
        setShowadd(true)
      }} className="fixed bottom-10 right-10 bg-[#5995fd] text-white px-4 py-2 rounded-md">
        Edit Blog
      </button>
    </div>
    {showadd && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setShowadd(false)}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <h4 className="text-lg font-medium text-gray-800">
                  Edit Blog
                </h4>
                <button
                  className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                  onClick={() => setShowadd(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
                <form className="max-w-md flex flex-col items-center justify-center gap-y-4 px-4 mx-auto mt-6">
                  <div className="w-full flex gap-x-4 items-center">
                    <label className="w-full text-gray-500">Title</label>
                    <input
                      name="title"
                      className="w-full py-2 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                      value={valued.title}
                      ref={tit}
                      onChange={(e) => onChanged(e)}
                    />
                  </div>
                  <div className="w-full flex gap-x-4 items-center">
                    <label className="w-full text-gray-500">Description</label>
                    <textarea
                      rows={10}
                      name="description"
                      className="w-full py-2 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                      value={valued.description}
                      ref={desc}
                      onChange={(e) => onChanged(e)}
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="flex items-center gap-3 p-4 mt-5 border-t">
                <button
                  className="px-6 py-2 text-white bg-[#5995fd] rounded-md outline-none ring-offset-2 ring-[#5995fd] focus:ring-2"
                  onClick={(e) => onSubmit(e)}
                >
                  Edit
                </button>
                <button
                  className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-[#5995fd] focus:ring-2"
                  onClick={() => setShowadd(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
  );
};

export default CommunityBlog;
