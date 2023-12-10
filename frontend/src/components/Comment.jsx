import React from "react";

const Comment = (props) => {
  const img =
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-4">
            <img className="w-[40px] h-[40px] object-cover" src={"http://127.0.0.1:8000/photos/"+props.photo} alt="profile" />
            <h2 className="text-md font-medium">{props.name}</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400">{props.date}</p>
        </div>
        <p className="text-sm sm:text-md mt-6 w-[90%] sm:w-[80%]">
          {props.answer}
        </p>
      </div>
    </>
  );
};

export default Comment;
