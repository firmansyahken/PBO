import React, { useState } from "react";
import {
    GridActiveIcon,
    GridIcon,
    ListActiveIcon,
    ListIcon,
  } from "../assets/icons";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";

const Header = (props) => {
  const navigate = useNavigate();
  const credential = JSON.parse(localStorage.getItem("credential"));
  const [layout, setLayout] = useState("grid");

  const handleLayout = (type) => {
    setLayout(type);
    return props.onChangeLayout(type);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="space-x-1">
          <button
            onClick={() => handleLayout("grid")}
            className={`${
              layout === "grid" && "bg-black"
            } px-2 py-2 border-[1.5px] border-black`}
          >
            <img
              className="w-[20px]"
              src={layout === "grid" ? GridActiveIcon : GridIcon}
            />
          </button>
          <button
            onClick={() => handleLayout("list")}
            className={`${
              layout === "list" && "bg-black"
            } px-2 py-2 border-[1.5px] border-black`}
          >
            <img
              className="w-[20px]"
              src={layout === "list" ? ListActiveIcon : ListIcon}
            />
          </button>
        </div>
        <div>
          { credential.role === "pacient" &&<button onClick={() => navigate("/create")} className="bg-black text-white text-sm px-6 py-2 font-bold">
            Konsultasi
          </button> }
        </div>
      </div>
      <div className="block sm:hidden">
          <Filter/>
      </div>
    </>
  );
};

export default Header;
