import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png"
import doc from "../assets/imgwface.jpeg"
import notification from "../assets/notifications.png"
import language from "../assets/langicon.png"
const NavBar = () => {


  return (
    <nav className=" shadow-md px-6 py-4 relative top-0 left-0 right-0 w-full z-50">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
  <Image src={language} alt="Language Icon" width={24} height={24}/> 
   <Image src={notification} alt="Notification Icon" width={28} height={28}/>

</div>


        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold text-gray-800">د/ أحمد إبراهيم</p>
          <Image
            src={doc}
            alt="Logo"
            width={40}
            height={0}
            className="h-10 rounded-full"
          />
        </div>


        <div className="relative mt-4 md:mt-0 w-full md:w-64">
          <input
            type="text"
            placeholder="ابحث هنا"
            className="w-full pr-10 py-2 border text-right border-gray-300 rounded-md bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-gray-500 absolute inset-y-0 right-3 my-auto"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>


        <div className=" flex mt-4 md:mt-0">
          <p className="text-gray-700 mt-2"> <span className="font-bold ">SP</span> مرحباً بك في شركة </p>
          <Image
           
            alt="logo"
            src={logo}
            className="ml-4 mt-2 w-[27px] h-[27px]"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-gray-600 mt-4 ml-3"
          >
            <polyline points="11 17 6 12 11 7" />
            <polyline points="18 17 13 12 18 7" />
          </svg>

        </div>

      </div>
    </nav>
  );
};

export default NavBar;