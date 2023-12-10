import React, { useState } from "react";
import Filter from "./Filter";

const Sidebar = () => {

  return (
    <>
      <div className="sticky top-[100px]">
        <Filter/>
      </div>
    </>
  );
};

export default Sidebar;
