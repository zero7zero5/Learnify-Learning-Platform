import UDSideNav from "../components/UDSideNav";
import { Outlet, useParams } from "react-router-dom";

export const UserDashboard = () => {
  return (
    <section className="pt-16 flex max-md:flex-col gap-20 max-md:gap-4">
      <UDSideNav />
      <Outlet />
    </section>
  );
};
