import React, { useState } from "react";

const Filter = (props) => {
  const filters = [
    {
      name: "Semua",
      color: "bg-blue-400",
    },
    {
      name: "Direspon",
      color: "bg-green-400",
    },
  ];

  const handleCategory = category => {
    return props.onChangeCategory(category)
  }

  return (
    <>
      <ul className="hidden sm:block space-y-2 px-4">
        {filters.map((filter, index) => (
          <li onClick={() => props.onChangeCategory(filter.name)} key={index}
            className={`${
              index < filters.length - 1 && "border-b border-gray-300"
            } py-4 ${
              props.category === filter.name ? "text-lg font-bold" : "text-md"
            } flex items-center gap-x-1`}
          >
            <div
              className={`h-[8px] w-[8px] ${filter.color} rounded-full`}
            ></div>
            {filter.name}
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-3 sm:hidden pt-6">
        {filters.map((filter, index) => (
            <button onClick={() => handleCategory(filter.name)} key={index} className={`${props.category === filter.name && "bg-black text-white"} px-4 py-2 border-[1.5px] border-gray-300`}>{filter.name}</button>
        ))}
      </div>
    </>
  );
};

export default Filter;
