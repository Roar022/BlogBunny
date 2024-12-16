import React from 'react'
import { redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { UserBlogs } from '../../components/UserBlogs';
console.log("Token:", sessionStorage.getItem("token")); // Debugging

export function loader({ request }) {
    if (sessionStorage.getItem("token") === null || sessionStorage.getItem("token")==="") {
      throw redirect("/?message=PleaseLogin");
    }
    return true;
}

const Dashboard = () => {
  console.log("Token:", sessionStorage.getItem("token")); // Debugging

  return (
    <div className='community_background h-screen'>
    <Navbar/>
    <UserBlogs />
    </div>
  )
}

export default Dashboard