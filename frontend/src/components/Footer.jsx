import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-100 border-t-[1.5px] border-gray-200">
        <div className="container mx-auto max-w-[1200px] px-6 py-24 grid grid-cols-1 sm:grid-cols-3 gap-12">
          <div className="">
            <h1 className="text-xl sm:text-2xl font-bold">Consultation</h1>
            <p className="text-sm sm:text-md mt-4 text-gray-400">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum nulla tempore aperiam sint quia, rem fuga fugiat saepe quis animi!
            </p>
          </div>
          <div className="mx-left sm:mx-auto">
            <h2 className="text-lg sm:text-xl font-bold">Page</h2>
            <ul className="mt-4 flex flex-col gap-y-2 text-sm sm:text-md text-gray-400">
                <Link to="/">Contact</Link>
                <Link to="/">Privacy Policy</Link>
                <Link to="/">FAQ</Link>
            </ul>
          </div>
          <div className="mx-left sm:mx-auto">
            <h2 className="text-lg sm:text-xl font-bold">Social Media</h2>
            <ul className="mt-4 flex flex-col gap-y-2 text-sm sm:text-md text-gray-400">
                <Link to="/">Facebook</Link>
                <Link to="/">Instagram</Link>
                <Link to="/">Twitter</Link>
                <Link to="/">Tiktok</Link>
            </ul>
          </div>
        </div>
        <div className="border-t-[1.5px] border-gray-200 mx-auto text-center py-12">
            <p className="text-sm sm:text-md text-gray-400">Pemerograman Berbasis Objek</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
