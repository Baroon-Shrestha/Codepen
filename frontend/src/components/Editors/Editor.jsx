import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";

import { Controlled as ControlledEditor } from "react-codemirror2";

export default function Editor(props) {
  const { language, mode, onChange, value } = props;
  const [isOpen, setIsOpen] = useState(true);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  const toggleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ width: isOpen ? "100%" : "25%", transition: "width 0.5s" }}>
      <div className="flex justify-between items-center p-2 ">
        <div className="">{language}</div>
        <button onClick={toggleOpenClose}>
          {isOpen ? <FiMinimize2 /> : <FiMaximize2 />}
        </button>
      </div>
      {isOpen ? (
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          options={{
            lineWrapping: true,
            lineNumbers: true,
            theme: "material",
            mode: mode,
            lint: true,
          }}
        />
      ) : (
        <div className="text-white min-h-5 text-center bg-[#263238] my-10">
          {/* Minimized editor */}
          Minimized {language} Editor
        </div>
      )}
    </div>
  );
}
