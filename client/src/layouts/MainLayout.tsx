import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <section className="lg:max-w-6xl mx-auto">
      <Navbar />
      <div className="px-4">
        <Outlet />
      </div>
    </section>
  );
};

export default MainLayout;
