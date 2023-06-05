import React, { useState } from "react";

const example = () => {

    const [showContent, setShowContent] = useState(false);

    const toggleContent = () => {
      setShowContent(!showContent);
    };
  
  return (
    <div>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={toggleContent}
    >
      {showContent ? "Hide Content" : "Show Content"}
    </button>
    <div
      className={`${
        showContent
          ? "max-h-screen transition-all ease-out duration-500"
          : "max-h-0 overflow-hidden transition-all ease-in duration-500"
      } mt-4`}
    >
      <p>Content goes here</p>
    </div>
  </div>

  )
}

export default example
