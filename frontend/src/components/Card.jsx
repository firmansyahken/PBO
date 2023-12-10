import React from "react";
import { useNavigate } from "react-router-dom"

const Card = (props) => {
  const navigate = useNavigate()
  const colors = {
    responded: "text-green-400",
    norespon: "text-black",
  }
  return (
    <>
      <div onClick={() => navigate(`/detail/${props.id}`)} className="cursor-pointer py-6 px-6 border-[1.5px] border-gray-300">
        <p className="text-sm sm:text-md">
          {props.consultation}
        </p>
        <div className="flex justify-between items-center mt-4">
          <p className={`text-sm font-bold ${colors[props.status]}`}>{props.status === "responded" ? "Direspon" : "Belum direspon"}</p>
          <p className="text-xs sm:text-sm text-gray-400">{props.date}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
