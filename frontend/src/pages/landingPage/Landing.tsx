import React from "react";
import "./landing.css";
import drone from '../../assets/Images/blue_drone.png'
import blogImg from "../../assets/Images/blue_blog.png"
import heartBig from "../../assets/Images/blue_heartbeat.png"
import remote from "../../assets/Images/blue_remote.png"
export function loader({ request }: { request: Request }) {
  const pathname = new URL(request.url).searchParams.get("message") || null;
  if (pathname) {
    console.log("logged out");
  }
  return request;
}

const LogoSvg = () => {
  return (
    <div className="text-xl">
      logo
    </div>
  );
};
const Landing = () => {
  return (
    <div className="h-screen w-screen landing_page">
      <div className="h-16  px-4 w-screen flex justify-between items-center">
        <div className=" text-white">
          <LogoSvg />
        </div>
        <div className="">
        <button className="px-7 py-2 bg-sky-600  rounded-3xl hover:bg-sky-700 text-gray-200 border-2  transition-all duration-200 border-gray-800 outline-none">
                Login
        </button>
        <button className="px-3 py-2  text-white hover:text-zinc-400 font-mono text-xl transition-all duration-200  outline-none">
                Sign Up
        </button>
        </div>
      </div>
      <div className="w-full text-white text-center flex flex-col justify-center items-center gap-y-4 mt-14">
        <h1 className="text-4xl">
          Publish your passions, your way
        </h1>
        <div className="text-sm">
          Create a unique and beatiful blog easily
        </div>
        <button className="px-3 py-2  text-white shadow-lg bg-orange-400 mt-10 rounded-sm hover:text-zinc-400 font-mono text-xl transition-all duration-200  outline-none">
                CREATE YOUR BLOG
        </button>
      </div>
      <img src={drone} alt="log1" className="blue_drone" />
      <img src={blogImg} alt="log1" className="blue_blog" />
      <img src={heartBig} alt="log1" className="blue_heartbeat" />
      <img src={remote} alt="log1" className="blue_remote" />
    </div>
  );
};
export default Landing;