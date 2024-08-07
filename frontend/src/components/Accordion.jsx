import { useState } from "react";

const Accordion = ({ name, preview }) => {
  const [accordion, setAccordion] = useState(false);
  return (
    <div className="py-2 mb-[0.4px] border-[1px] bg-[#F2F6FF] border-blue-500 rounded-md">
      <button
        onClick={() => setAccordion(!accordion)}
        className="flex gap-4 items-center px-2 w-full"
      >
        {accordion ? (
          <span className="transition-transform duration-300 transform rotate-0">
            <img className="w-4" src="/assets/up.svg" />
          </span>
        ) : (
          <span className="transition-transform duration-300 transform rotate-180">
            <img className="w-4" src="/assets/up.svg" />
          </span>
        )}

        <span>{name}</span>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-md ${
          accordion
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="bg-white flex flex-col border-2 pl-10 overflow-hidden">
          <div className="flex gap-2 items-center">
            <input type="checkbox" />
            <a className=" cursor-pointer" onClick={preview}>
              Course Preview
            </a>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" />
            <a className=" cursor-pointer" href="">
              Introduction to HTML
            </a>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" />
            <a className=" cursor-pointer" href="">
              HTML Headings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
