import React from "react";
import "./landing.css";
import {motion} from "framer-motion"
// blue background
import drone from "../../assets/Images/blue_drone.png";
import blogImg from "../../assets/Images/blue_blog.png";
import heartBig from "../../assets/Images/blue_heartbeat.png";
import remote from "../../assets/Images/blue_remote.png";

// red background
import red_blog from "../../assets/Images/red_blog.png";
import red_apple from "../../assets/Images/red_apple.png";
import red_belen from "../../assets/Images/red_belen.png";
import red_fette from "../../assets/Images/red_fette.png";
import red_spoon from "../../assets/Images/red_spoon.png";
import red_plate from "../../assets/Images/red_plate.png";
import red_plate2 from "../../assets/Images/red_plate2.png";
import red_cup from "../../assets/Images/red_cup.png";

//green background
import green_blog from "../../assets/Images/green_blog.png";
import green_a from "../../assets/Images/green_a.png";
import green_b from "../../assets/Images/green_b.png";
import green_c from "../../assets/Images/green_c.png";
import green_chappal from "../../assets/Images/green_chappal.png";
import green_coffe from "../../assets/Images/green_coffee.png";
import green_flowers from "../../assets/Images/green_flowers.png";
import green_image from "../../assets/Images/green_image.png";
import { Link, redirect } from "react-router-dom";
import LandingNavbar from "../../components/LandingNavbar";

export function loader({ request }) {
  if (sessionStorage.getItem("token") !== null) {
    throw redirect("/dashboard?message=AlreadyLogin");
  }
  return null;
}

const Landing = () => {
  return (
    
      <div
      className="h-screen w-screen landing_page">
        {/* <div className="h-16  px-4 w-screen flex justify-between items-center">
          <div className=" text-white">
            <LogoSvg />
          </div>
          <div className="">
            <Link
              to={"/signup"}
              className="px-6 py-1 bg-orange-400 text-lg rounded-md hover:opacity-80 text-gray-200 transition-all duration-200 outline-none"
            >
              Login
            </Link>
          </div>
        </div> */}
        <LandingNavbar />
        <div className="w-full text-white text-center flex flex-col justify-center items-center gap-y-4 mt-14">
          <h1 className="text-4xl">Publish your passions, your way</h1>
          <div className="text-sm">
            Create a unique and beatiful blog easily
          </div>
          <Link
            to={"/signup"}
            className="px-3 py-2  text-white bg-orange-400 mt-9 rounded-md hover:opacity-80 font-mono text-lg transition-all duration-200  outline-none"
          >
            CREATE YOUR BLOG
          </Link>
        </div>

        {/* blue background */}
        <img
          src={drone}
          alt="log1"
          className="_img_ _blue_animate  blue_drone"
        />
        <img
          src={blogImg}
          alt="log1"
          className=" _img_ _blue_animate _img_blog blue_blog"
        />
        <img
          src={heartBig}
          alt="log1"
          className="_img_ _blue_animate blue_heartbeat"
        />
        <img
          src={remote}
          alt="log1"
          className="_img_ _blue_animate blue_remote"
        />

        {/* green background */}
        <img
          src={green_blog}
          alt="log1"
          className="_img_ _green_animate _img_blog green_blog   "
        />
        <img
          src={green_a}
          alt="log1"
          className="_img_ _green_animate green_a      "
        />
        <img
          src={green_b}
          alt="log1"
          className="_img_ _green_animate green_b      "
        />
        <img
          src={green_c}
          alt="log1"
          className="_img_ _green_animate green_c      "
        />
        <img
          src={green_chappal}
          alt="log1"
          className="_img_ _green_animate green_chappal"
        />
        <img
          src={green_coffe}
          alt="log1"
          className="_img_ _green_animate green_coffe  "
        />
        <img
          src={green_flowers}
          alt="log1"
          className="_img_ _green_animate green_flowers"
        />
        <img
          src={green_image}
          alt="log1"
          className="_img_ _green_animate green_image  "
        />

        {/* red background */}
        <img
          src={red_blog}
          alt="log1"
          className="_img_ _red_animate  _img_blog red_blog  "
        />
        <img
          src={red_apple}
          alt="log1"
          className="_img_ _red_animate red_apple "
        />
        <img
          src={red_belen}
          alt="log1"
          className="_img_ _red_animate red_belen "
        />
        <img
          src={red_fette}
          alt="log1"
          className="_img_ _red_animate red_fette "
        />
        <img
          src={red_spoon}
          alt="log1"
          className="_img_ _red_animate red_spoon "
        />
        <img
          src={red_plate}
          alt="log1"
          className="_img_ _red_animate red_plate "
        />
        <img
          src={red_plate2}
          alt="log1"
          className="_img_ _red_animate red_plate2"
        />
        <img
          src={red_cup}
          alt="log1"
          className="_img_ _red_animate red_cup   "
        />
      </div>
    
  );
};

export default Landing;
