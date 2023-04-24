import { useState } from "react";

import { Outlet } from "react-router-dom";

import "./styles/App.scss";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
