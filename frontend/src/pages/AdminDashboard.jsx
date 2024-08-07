import  ADSideNav  from "../components/ADSideNav";
import ADMainContent  from "../components/ADMainContent";
import { useState } from "react";

export default function AdminDashBoard() {

  const [section,setSection] = useState("user");
  return (
    <div>
      <section className=" flex max-md:flex-col w-[100%] gap-20 max-md:gap-4">
        <ADSideNav 
        setSection={setSection}
        />
        <ADMainContent
        details={section}
        />
      </section>
      hello
    </div>
  );
}
