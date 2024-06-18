import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import OpenEditNav from "../Navbar/OpenEditNav";
import { backendUrl } from "../../../url";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function OpenEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [loggedIn, setLoggedIn] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [openEditors, setOpenEditors] = useState({
    html: true,
    css: true,
    js: true,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser) {
      setLoggedIn(storedUser);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/codepen/viewone/${id}`,
          {
            withCredentials: true,
          }
        );
        const { html, css, js, title } = response.data.view;
        const userName = response.data.view.userId.userName;
        const userId = response.data.view.userId._id;
        setTitle(title);
        setHtml(html);
        setCss(css);
        setJs(js);
        setUser(userName);
        setUserId(userId);
      } catch (error) {
        console.log("Error fetching code:", error);
      }
    };

    fetchData();
  }, [id]);

  const updateCode = async () => {
    const token = localStorage.getItem("userDetails");
    const userData = JSON.parse(token);
    const loggedId = userData.user._id;

    if (!loggedIn) {
      alert("You need to login before updating the code");
      return;
    }

    if (loggedId !== userId) {
      alert("You don't have access to update this code snippet");
      return;
    }

    try {
      const response = await axios.put(
        `${backendUrl}/codepen/update/${id}`,
        {
          html,
          css,
          js,
          title,
        },
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      if (data.success) {
        alert("Code snippet updated successfully!");
        setHasUnsavedChanges(false);
      }
    } catch (error) {
      console.log("Error updating code:", error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const toggleOpenClose = (editor) => {
    const newOpenEditors = { ...openEditors, [editor]: !openEditors[editor] };
    const openCount = Object.values(newOpenEditors).filter(Boolean).length;
    if (openCount > 0) {
      setOpenEditors(newOpenEditors);
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

  async function penClick() {
    const token = localStorage.getItem("userDetails");
    const userData = JSON.parse(token);
    const loggedId = userData.user._id;

    if (!loggedIn) {
      alert("You need to login before editing the title");
      return;
    }

    if (loggedId !== userId) {
      alert("You don't have access to update this code");
      return;
    }

    const newTitle = window.prompt("Enter the new title:", title);
    if (newTitle) {
      try {
        const response = await axios.put(
          `${backendUrl}/codepen/updatetitle/${id}`,
          {
            title: newTitle,
          },
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setTitle(newTitle);
          alert("Title updated successfully!");
          setHasUnsavedChanges(false);
        }
      } catch (error) {
        console.log("Error updating title:", error);
      }
    }
  }

  return (
    <div className="bg-secondary h-screen">
      <OpenEditNav
        title={title}
        editName={penClick}
        update={updateCode}
        projectUser={user}
      />
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
