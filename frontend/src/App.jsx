import { useState } from "react";
import SideNav from "./components/Navbar/SideNav";
import NewCard from "./components/NewCard";
import "./index.css";
import Nav from "./components/Navbar/Nav";
import EditorOut from "./components/Editors/EditorOut";
function App() {
  return (
    <>
      <Nav />
      <EditorOut />
      {/* <div className="flex h-scree">
        <SideNav />
        <div className="flex-1 p-4">
          <h1>Welcome to the store</h1>
          <NewCard />
        </div>
      </div> */}
    </>
  );
}

export default App;
