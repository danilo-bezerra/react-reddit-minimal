import { Outlet } from "react-router-dom";

import "./styles/App.scss";
import { Sidebar } from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default App;
