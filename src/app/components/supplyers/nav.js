import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png"
const NavBar = () => {


  return (
    <nav className="bg-white shadow-md px-6 py-4 sticky top-0 left-0 right-0 w-full z-50">
      <div className="container mx-auto max-w-screen-lg flex flex-col md:flex-row md:items-center md:justify-between">


        <div className="flex items-center gap-3">
          <p className="text-lg font-semibold text-gray-800">د/ أحمد إبراهيم</p>
          <Image
            src="https://s3-alpha-sig.figma.com/img/50e2/bbc2/3961dfb1fb031d40ddc0d9f18d6f6392?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Qe42djhSzpBGLUN5CKkTp~Kj7VYDQH3aejw6Wwt5sa3tbTLJUMSxHmpclSIxtfDi0nTn5bQ76pFFaK1fl0vGZOghNVqLOaPcu7x4zGchM-ky2ux8xNegT9v4whNiX6YFyVap~CJO5eFdo2iTprzJb~vB4Mp3i9bBT0GqxySJhu6uNjRd921IG6KXuVfXTsMvb~R7Ilmrx50DacQ4xsa9MXb4coT7wLk2mNf6XhBdmjWcioqi1RlVdtcJGEsAQeqhtArElIsARpCHgwGPQ07r6g7xPpiQ0uncFLOYKUetinSODGGmI97ikNivGESK4Xrp2Iy-dpJQRNNx75fja2DhRw__"
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
            className="w-64 px-10 py-2 border text-right border-gray-300 rounded-md bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-gray-500 absolute inset-y-0 left-3 my-auto"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>


        <div className=" flex mt-4 md:mt-0">
          <p className="text-gray-700">مرحباً بك في شركة <span className="font-bold ">SP</span></p>
          <Image
            width={27}
            height={27}
            alt="logo"
            src={logo}
            className="ml-4"
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-gray-600 mt-4"
        >
          <polyline points="11 17 6 12 11 7" />
          <polyline points="18 17 13 12 18 7" />
        </svg>

      </div>
    </nav>
  );
};

export default NavBar;