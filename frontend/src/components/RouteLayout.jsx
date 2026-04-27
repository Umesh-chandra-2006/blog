import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";
import { useAuth } from "../store/useAuth";

function RouteLayout() {
  useEffect(() => {
    async function checkAuth() {
      await useAuth.getState().checkAuth();
    }
    checkAuth();
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RouteLayout;
