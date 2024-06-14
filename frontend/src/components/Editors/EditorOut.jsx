import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import Nav from "../Navbar/Nav";
import { backendUrl } from "../../../url";
import axios from "axios";

export default function EditorOut() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [title, setTitle] = useState("");

  const [openEditors, setOpenEditors] = useState({
    html: true,
    css: true,
    js: true,
  });

  useEffect(() => {
    const oldTimeOut = setTimeout(() => {
      setSrcDoc(`
      <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
      </html>`);
    }, 1000);

    return () => clearTimeout(oldTimeOut);
  }, [html, css, js]);

  const toggleOpenClose = (editor) => {
    const newOpenEditors = { ...openEditors, [editor]: !openEditors[editor] };
    const openCount = Object.values(newOpenEditors).filter(Boolean).length;
    if (openCount > 0) {
      setOpenEditors(newOpenEditors);
    }
  };

  const saveCode = async () => {
    try {
      const title = prompt("Enter the title for your code:");
      if (!title) {
        alert("Title is required to save the code");
        return;
      }
      setTitle(title);

      localStorage.setItem(
        "savedCode",
        JSON.stringify({ title, html, css, js })
      );

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${backendUrl}/codepen/save`,
        {
          title,
          html,
          css,
          js,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Response status:", res.status);
      if (res.status === 201 || res.status === 200) {
        alert("Code saved successfully!");
      } else {
        alert("Failed to save code");
      }
    } catch (error) {
      console.error("Error saving code snippet:", error);
      alert("An error occurred while saving the code");
    }
  };

  return (
    <div className="">
      <Nav save={saveCode} title={title} />
      <div className="bg-back rounded-lg flex grow basis-0 gap-[.5rem] p-4">
        <Editor
          language="HTML"
          mode="xml"
          value={html}
          onChange={setHtml}
          isOpen={openEditors.html}
          toggleOpenClose={() => toggleOpenClose("html")}
        />
        <Editor
          language="CSS"
          mode="css"
          value={css}
          onChange={setCss}
          isOpen={openEditors.css}
          toggleOpenClose={() => toggleOpenClose("css")}
        />
        <Editor
          language="JS"
          mode="javascript"
          value={js}
          onChange={setJs}
          isOpen={openEditors.js}
          toggleOpenClose={() => toggleOpenClose("js")}
        />
      </div>

      <div className="bg-slate-600 h-screen">
        <iframe
          srcDoc={srcDoc}
          title="Output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
