import React, { useState } from "react";
import Editor from "./Editor";

export default function EditorOut() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const srcDoc = `
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>`;

  return (
    <div>
      <div className="bg-slate-500 flex gap-2 flex-grow">
        <Editor
          language="HTML"
          mode="xml"
          value={html}
          onChange={setHtml}
          className="text-orange-700"
        />
        <Editor language="CSS" mode="css" value={css} onChange={setCss} />
        <Editor language="JS" mode="javascript" value={js} onChange={setJs} />
      </div>
      <div className="bg-slate-600 h-screen border mt-4">
        <iframe
          srcDoc={srcDoc}
          title="Output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          // height="100%"
        />
      </div>
    </div>
  );
}
