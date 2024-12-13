import axios from 'axios';
import { toast } from "react-toastify";
import React, { useState } from 'react'
import Navbar from "../../components/Navbar";

const ContactUs = () => {
    const [contact,setContact]=useState({
        email:"",
        message:"",
        name:""
    });

    function handlechange(e){
        const {name,value}=e.target;
        setContact(prev=>({...prev,[name]:value}));
    }

   async function handlesubmit(e){
      const id=document.getElementById("form");
        e.preventDefault();
        
        try {
            
            const message = await fetch("http://localhost:8080/contact/send",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(contact)
            })
            const respon = await message.json();
            toast.success("Query sent successfully");
            console.log(respon);
        } catch (error) {
            toast.error("Error sending query");
            console.log(error);
        }
        id.reset();

    }
  return (
    <>
    <Navbar />
    <main className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-lg mx-auto gap-12 justify-between items-center lg:flex lg:max-w-none">
                    <div className="max-w-md space-y-3">
                        <h3 className="text-indigo-600 font-semibold">
                            Contact Us
                        </h3>
                        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Let us know how we can help
                        </p>
                        <p>
                            We’re here to help and answer any question you might have, We look forward to hearing from you! Please fill out the form.
                        </p>
                    </div>
                    <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
                        <form
                            onSubmit={(e) => handlesubmit(e)}
                            id='form'
                            className="space-y-5"
                        >
                            <div>
                                <label className="font-medium">
                                    Full name
                                </label>
                                <input
                                    type="text"
                                    name='name'
                                    onChange={handlechange}
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    onChange={handlechange}
                                    name='email'
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Message
                                </label>
                                <textarea name='message' 
                                    onChange={handlechange}
                                 required className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"></textarea>
                            </div>
                            <button
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
        </>
  )
}

export default ContactUs
