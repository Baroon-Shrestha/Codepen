import React, { useState, useEffect } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { FiMinimize2, FiMaximize2 } from "react-icons/fi";
import { Controlled as ControlledEditor } from "react-codemirror2";
import "../../index.css";

export default function Editor(props) {
  const { language, mode, onChange, value, isOpen, toggleOpenClose } = props;

  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    <div
      className={` transition-width duration-500 ${
        isOpen ? "w-full" : "w-[25%]"
      } bg-primary rounded-2xl`}
    >
      <div className="flex justify-between p-2 bg-slte-200 ">
        <div className="tex">{language}</div>
        <button onClick={toggleOpenClose}>
          {isOpen ? <FiMinimize2 /> : <FiMaximize2 />}
        </button>
      </div>
      <div className="">
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
      </div>
    </div>
  );
}
