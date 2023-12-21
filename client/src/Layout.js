import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="main">
      <Header />
      <div className="post-container">
        <Outlet />
      </div>
    </div>
  );
}
