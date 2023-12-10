import React from "react";

const List = (props) => {
  const colors = {
    responded: "border-l-green-300",
    norespon: "border-l-black",
  }

  return (
    <>
      <div className={`py-6 px-6 border-[1.5px] border-gray-300 border-l-4 ${colors[props.status]}`}>
        <p className="text-sm sm:text-md">
          {props.consultation}
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs sm:text-sm text-gray-400">{props.date}</p>
        </div>
      </div>
    </>
  );
};

export default List;
