import { Suspense } from "react";
import Loader from "./Loader";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  );
}
