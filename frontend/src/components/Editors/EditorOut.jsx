import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import Nav from "../Navbar/Nav";
import { backendUrl } from "../../../url";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditorOut() {
  const [html, setHtml] = useState(localStorage.getItem("html") || "");
  const [css, setCss] = useState(localStorage.getItem("css") || "");
  const [js, setJs] = useState(localStorage.getItem("js") || "");
  const [srcDoc, setSrcDoc] = useState("");
  const [title, setTitle] = useState(localStorage.getItem("title") || "");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [openEditors, setOpenEditors] = useState({
    html: true,
    css: true,
    js: true,
  });

  const navigate = useNavigate();
  const location = useLocation();

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
      const token = localStorage.getItem("userDetails");

      if (!token) {
        alert("You need to be logged in to save the code.");
        navigate("/login");
        return;
      }

      let currentTitle = title;

      if (!currentTitle) {
        currentTitle = prompt("Enter the title for your code:");
        if (!currentTitle) {
          alert("Title is required to save the code");
          return;
        }
        setTitle(currentTitle);
        localStorage.setItem("title", currentTitle);
      }

      const res = await axios.post(
        `${backendUrl}/codepen/save`,
        {
          title: currentTitle,
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
      const Id = res.data.newCodeSnippet.userId;

      if (res.status === 201 || res.status === 200) {
        setUserId(Id);

        localStorage.setItem("title", currentTitle);
        localStorage.setItem("html", html);
        localStorage.setItem("css", css);
        localStorage.setItem("js", js);
        localStorage.setItem("userId", Id);

        alert("Code saved successfully!");
        setHasUnsavedChanges(false);
      } else {
        alert("Failed to save code");
      }
    } catch (error) {
      console.error("Error saving code snippet:", error);
      alert("An error occurred while saving the code");
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        const confirmationMessage =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [html, css, js]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("html");
      localStorage.removeItem("css");
      localStorage.removeItem("js");
      localStorage.removeItem("title");
      localStorage.removeItem("userId");
    };
  }, [location.pathname]);

  return (
    <div className="bg-secondary h-screen">
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

      <div className="bg-white h-3/6">
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
