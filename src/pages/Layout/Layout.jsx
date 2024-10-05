import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "../../components";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
};

export { Layout };
