import React from 'react'
import { redirect } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { UserBlogs } from '../../components/UserBlogs';
export function loader({ request }) {
    if (sessionStorage.getItem("token") === null || sessionStorage.getItem("token")==="") {
      throw redirect("/?message=PleaseLogin");
    }
    return null;
}

const Dashboard = () => {
  return (
    <div className='community_background h-screen'>
    <Navbar/>
    <UserBlogs />
    </div>
  )
}

export default Dashboard