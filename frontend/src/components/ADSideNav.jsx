import { MdLogout } from "react-icons/md";

export default function ADSideNav({setSection}) {
  return (
    <div
      className="bg-blue-500 text-white md:w-[20%]  w-[30%] rounded-lg h-screen flex flex-col justify-between 
      max-md:flex-row max-md:w-[100%] max-md:h-[40px]"
    >
      <div className="p-4 mt-12 max-md:p-0 max-md:mt-0 max-md:overflow-x-auto max-md:max-w-screen-lg hover:overflow-scroll">
        <ul className="space-y-2 max-md:space-y-0 max-md:flex max-md:flex-row max-md:items-center max-md:justify-center max-md:min-w-max">
          <li>
            <a
              href="#"
              className="block p-2 hover:bg-blue-600 rounded-md "
                onClick={()=>setSection("user")}
            >
              Users
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block p-2 hover:bg-blue-600 rounded-md "
              onClick={()=>setSection("instructor")}
              
            >
              Instructors
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block p-2 hover:bg-blue-600 rounded-md"
              onClick={()=>setSection("course")}
              
            >
              Courses
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="mt-auto mb-4">
        <ul className="space-y-2 ml-2 max-md:ml-0">
          <li>
            <a
              href="#"
              className="p-2 hover:bg-blue-600 rounded flex items-center w-[93%] max-md:border-l-2 max-md:rounded-lg"
            >
              <MdLogout className="mr-2" />
              Logout
            </a>
          </li>
        </ul>
      </div> */}
    </div>
  );
}
