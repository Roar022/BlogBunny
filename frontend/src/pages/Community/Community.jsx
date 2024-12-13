import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { socket } from "../../Utils/socket";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

const Community = () => {
  const [blogs, setBlogs] = useState([]);
  const [showadd, setShowadd] = useState(false);
  useEffect(() => {
    const fetchfn = async () => {
      const idLoad = toast.loading("Please wait, Fetching post...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      try {
        const a = await axios.get("http://localhost:1337/api/blogs");
        a.data.data.map((item) => {
          const id = item.id;
          const t = item.attributes.title;
          const d = item.attributes.description;
          setBlogs((prev) => [...prev, { id: id, title: t, description: d }]);
        });
        setTimeout(
          function () {
            toast.update(idLoad, {
              render: "Community blogs.",
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
              render: "Error in fetchng blog.",
              type: "error",
              isLoading: false,
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
          },
          [500]
        );
      }
    };
    console.log(blogs);
    fetchfn();
    return () => {
      setBlogs([]);
    };
  }, []);

  const [valued, setValued] = useState({
    title: "",
    description: "",
  });

  function onChanged(e) {
    setValued((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(3);
  }
  async function onSubmit(event) {
    event.preventDefault();
    const idLoad = toast.loading("Please wait, adding blog...", {
      position: toast.POSITION.TOP_RIGHT,
    });
    try {
      const data = await axios.post("http://localhost:1337/api/blogs", {
        data: valued,
      });
      const id = data.data.data.id;
      const t = data.data.data.attributes.title;
      const d = data.data.data.attributes.description;
      const blog = {
        id: id,
        title: t,
        description: d,
      };
      socket.emit("create-blog", blog);
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Successfully added blog.",
            type: "success",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
      setValued({
        title: "",
        description: "",
      })
    } catch (error) {
      console.log(error);
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Error adding blog.",
            type: "error",
            isLoading: false,
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
    }
    setShowadd(false);
  }
  useEffect(() => {
    // Define the event handler outside of the component function
    function handleNewBlog(a) {
      setBlogs((prev) => [...prev, a]);
    }

    // Register the event listener when the component mounts
    socket.on("new-blog", handleNewBlog);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("new-blog", console.log(56));
    };
  }, []);
  return (
    <div className="community_background h-screen ">
      <Navbar />
      <div className=" border-indigo-300 text-center text-3xl my-2 text-[#3c69b8]  font-bold  p-4 ">
        Community Blogs
      </div>
      <ol
        className="md:px-9 max-h-[calc(100vh-190px)] exampleforscroll md:w-[76%] w-[95%] md:mx-0 mx-auto overflow-y-auto flex justify-start gap-4 items-center flex-wrap"
        style={{}}
      >
        {blogs.length > 0 &&
          blogs.map((item, idx) => {
            return (
              <Link
                to={`/community/${item.id}`}
                key={idx}
                className="p-4 mb-5 rounded-md h-[240px] overflow-hidden  bg-[#ffffff33] backdrop-blur-[10px] flex-auto shadow-md border w-[280px]"
              >
                <h1 className="text-blue-950 font-medium text-2xl pb-1 border-b-2 border-indigo-300">
                  {item.title}
                </h1>
                <h4 className="text-gray-600 my-3 h-[210px]">
                  <ReactMarkdown>{item.description}</ReactMarkdown>
                </h4>
              </Link>
            );
          })}
      </ol>
      <button
        className="fixed bottom-10 right-10 bg-[#5995fd] text-white px-4 py-2 rounded-md"
        onClick={() => {
          setShowadd(true);
        }}
      >
        Add Blog
      </button>
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
                  Add a New Blog
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
                  Add
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
    </div>
  );
};

export default Community;
