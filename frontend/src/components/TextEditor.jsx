import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "./Navbar";
import { TbBulb } from "react-icons/tb";
import { IoMdSend } from "react-icons/io";
import { FcIdea } from "react-icons/fc";
import Accordian from "./Accordian";
import { toast } from "react-toastify";
import axios from "axios";
import {
  redirect,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Server_url from "../Utils/server_url";
import Loader from "./Loader/Loader";
export function loader({ request }) {
  if (sessionStorage.getItem("token") === null) {
    throw redirect("/?message=PleaseLogin");
  }
  const pathname = new URL(request.url).searchParams.get("id") || null;
  if (pathname) {
    return true;
  }
  return false;
}
const TextEditor = () => {
  const [params, setParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  console.log(params.get("id"));
  const isEdit = useLoaderData();
  const [editorHtml, setEditorHtml] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const Token = sessionStorage.getItem("token");
  const [suggestedTitles, setSuggestedTitles] = useState([]);
  // Handle Quill changes
  const navigate = useNavigate();
  console.log(isEdit);

  // 
  useEffect(() => {
    fetch(`${Server_url}api/ai/trending-titles`, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch trending titles");
        return res.json();
      }) // parse JSON
      .then((data) => setSuggestedTitles(data.titles))
      .catch((err) => console.error(err));
  }, []);

  // For getting blogs
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`${Server_url}api/blogs/getblogbyId/${params.get("id")}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((res) => {
          // setBlog(res.data);
          setEditorHtml(res.data.Description);
          setLabel(res.data.label);
          setTitle(res.data.title);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
    setIsLoading(false);
  }, []);

  // it will give content for given title
  const handleSuggest = async () => {
    if (title.size<=5) {
      return toast.error("Please provide title of at least 5 words");
    }
    const idLoad = toast.loading("Please wait, Writing blog...", {
      // position: toast.POSITION.TOP_RIGHT,
    });
   
    const resp = await fetch(`${Server_url}api/ai/suggest-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify({ title }),
    });
    const data = await resp.json();
    setEditorHtml(data.markdown);
    setTimeout(
      function () {
        toast.update(idLoad, {
          render: "Blog added successfully",
          type: "success",
          isLoading: false,
          // position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      },
      [500]
    );
  };

  // For suggesting ideas
  const handleSuggest1 = async (suggestTitle) => {
    if (!suggestTitle || suggestTitle.split(" ").length < 5) {
      return toast.error("Please provide title of at least 5 words");
    }
    setTitle(suggestTitle);
    console.log(suggestTitle)
    const idLoad = toast.loading("Please wait, Writing blog...", {
      // position: toast.POSITION.TOP_RIGHT,
    });
   
    const resp = await fetch(`${Server_url}api/ai/suggest-content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`,
      },
      body: JSON.stringify({ title:suggestTitle }),
    });
    const data = await resp.json();
    setEditorHtml(data.markdown);
    setTimeout(
      function () {
        toast.update(idLoad, {
          render: "Blog added successfully",
          type: "success",
          isLoading: false,
          // position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      },
      [500]
    );
  };

  const handleQuillChange = async (html) => {
    let idLoad;
    try {
      const imageTags = html.match(/<img[^>]+src="([^">]+)"/g);

      if (imageTags) {
        for (const imgTag of imageTags) {
          const imgUrl = imgTag.match(/src="([^"]+)"/)[1];

          if (imgUrl.startsWith("data:image")) {
            // Image is in base64 format, upload to Cloudinary
            idLoad = toast.loading("Please wait, Saving Image...", {
              // position: toast.POSITION.TOP_RIGHT,
            });

            setUploadingImage(true);
            const formData = new FormData();
            formData.append("file", imgUrl);
            // Replace with your upload preset
            formData.append("cloud_name", "dvyl9zjkp");
            formData.append("upload_preset", "an7tddha");
            const response = await fetch(
              "https://api.cloudinary.com/v1_1/dvyl9zjkp/image/upload",
              {
                method: "post",
                body: formData,
              }
            );
            const imgData = await response.json();
            const newImgSrc = imgData.url.toString();
            html = html.replace(imgUrl, newImgSrc); // Replace with Cloudinary URL
            setTimeout(
              function () {
                toast.update(idLoad, {
                  render: "Image Saved.",
                  type: "success",
                  isLoading: false,
                  // position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1000,
                });
              },
              [500]
            );
          }
        }
      }

      setEditorHtml(html);
    } catch (error) {
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Error in saving image.",
            type: "error",
            isLoading: false,
            // position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
    } finally {
      setUploadingImage(false);
    }

    // setEditorHtml(html);
  };

  // Handle saving the content
  const saveContent = async () => {
    if (!title) {
      return toast.error("Please provide title.");
    }
    if (!label) {
      return toast.error("Please provide label");
    }
    if (!editorHtml) {
      return toast.error("Please write something.");
    }
    const formdata = {
      title,
      label,
      description: editorHtml,
    };
    const Token = sessionStorage.getItem("token");

    const idLoad = toast.loading("Please wait, Adding Blog...", {
      // position: toast.POSITION.TOP_RIGHT,
    });
    try {
      const postBlog = await axios.post(
        "http://localhost:5001/api/blogs/create",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      console.log(postBlog.data);
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Successfuly Created blog.",
            type: "success",
            isLoading: false,
            // position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
      navigate("/dashboard");
    } catch (error) {
      return setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Network Error",
            type: "error",
            isLoading: false,
            // position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
    }
  };

  async function editContent() {
    if (!title) {
      return toast.error("Please provide title.");
    }
    if (!label) {
      return toast.error("Please provide label");
    }
    if (!editorHtml) {
      return toast.error("Please write something.");
    }
    const formdata = {
      title,
      label,
      description: editorHtml,
      blogId: params.get("id"),
    };
    console.log(formdata);
    const idLoad = toast.loading("Please wait, Editing blog...", {
      // position: toast.POSITION.TOP_RIGHT,
    });
    try {
      const postBlog = await axios.post(
        "http://localhost:5001/api/blogs/update",
        formdata
      );
      console.log(postBlog);
      setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Successfuly Edited blog.",
            type: "success",
            isLoading: false,
            // position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
      navigate("/dashboard");
    } catch (error) {
      return setTimeout(
        function () {
          toast.update(idLoad, {
            render: "Network Error",
            type: "error",
            isLoading: false,
            // position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        },
        [500]
      );
    }
  }

  return (
    <div className="min-w-screen min-h-screen">
      {isEdit && isLoading && <Loader />}
      <Navbar />
      <hr className="border-t border-gray-300 my-3 hidden md:block" />
      
      <div className="h-full flex  flex-col ">
        <div className="w-full  flex justify-between items-center py-1 px-3">
          <div className="flex items-center w-[82%] my-2">

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle((prev) => e.target.value)}
            className="focus:outline-none border-b-2 md:w-[85%] w-[50%] md:m-0 mr-1 border-indigo-400 px-5  text-lg"
            />
          {/* <input
            type="text"
            placeholder="label"
            value={label}
            onChange={(e) => setLabel((prev) => e.target.value)}
            className="focus:outline-none md:hidden block border-b-2 w-[25%] border-indigo-400 px-5 py-1  text-sm"
          /> */}
          <button
            onClick={handleSuggest}
            className=" px-3 py-2 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-md min-w-[50px] min-h-[30px] shadow md:inline"
            >
            <div className="flex justify-center items-center  md:space-x-2 text-lg">
              <TbBulb className="text-lg inline-block  " />
              <div className="md:block hidden pl-3 border-indigo-200 font-normal border-l">
                Suggest
              </div>
            </div>
          </button>
          </div>

          <button className=" px-3 py-2 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-md min-w-[50px] min-h-[30px] shadow md:inline">
            <div
              className="flex justify-center items-center  md:space-x-2 text-lg"
              onClick={isEdit ? editContent : saveContent}
            >
              <IoMdSend className="text-lg inline-block  " />
              <div className="md:block hidden pl-3 border-indigo-200 font-normal border-l">
                {isEdit ? "Edit" : "Publish"}
              </div>
            </div>
          </button>
        </div>
        <div className="w-full flex">
          <div className="md:w-[85%] w-full flex  md:border-r-2 px-1 md:px-7 mt-1 h-[40.5rem]">
            <ReactQuill
              theme="snow"
              className="h-[38rem] w-full"
              value={editorHtml}
              onChange={handleQuillChange}
              placeholder="Compose your blog..."
              readOnly={uploadingImage}
              modules={TextEditor.modules}
              formats={TextEditor.formatArray}
            />
          </div>
          <div className="w-full md:w-[20%] mt-1">
            {/* <div className="w-full"> */}
              <Accordian label={label} setLabel={setLabel} />

            {/* </div> */}
              {/* <div>Hii This svbs vs schjs js vsn shj sjdvs vjs dv</div> */}
            {suggestedTitles.length > 0 && (
              <div className="mt-4">
                <div className="text-center justify-center">Click on any ideas</div>
                {JSON.parse(suggestedTitles)?.titles.map((t, index) => (
                  <div
                    key={index} 
                    className="cursor-pointer hover:underline m-2"
                    onClick={() => {
                      handleSuggest1(t);
                    }}
                  >
                    {index+1}. {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;

TextEditor.formatArray = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

TextEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"], // Added 'video' option
    [{ color: [] }, { background: [] }], // Text color and background color

    [{ align: [] }], // Text alignment
    ["clean"], // Remove formatting
  ],
};
