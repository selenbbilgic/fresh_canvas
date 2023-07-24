import React, { useState } from "react";

function MyComponent() {
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);

  const toggleSideBar1 = () => {
    setIsActive1(!isActive1);
  };

  const toggleSideBar2 = () => {
    setIsActive2(!isActive2);
  };

  const handleClick = (id) => {
    if (id === "btn-close-1") {
      toggleSideBar1();
    } else if (id === "btn-close-2") {
      toggleSideBar2();
    }
  };

  return (
    <div>
      <div id="side-bar-1" className={isActive1 ? "active" : ""}>Sidebar 1 Content</div>
      <div id="side-bar-2" className={isActive2 ? "active" : ""}>Sidebar 2 Content</div>
      <button id="btn-close-1" onClick={() => handleClick("btn-close-1")}>Close Sidebar 1</button>
      <button id="btn-close-2" onClick={() => handleClick("btn-close-2")}>Close Sidebar 2</button>
    </div>
  );
}

export default MyComponent;