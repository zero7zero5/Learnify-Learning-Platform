import Button from "./Button";

const Card = ({ imgURL, courseName, price, categories }) => {
  return (
    <section className="flex items-center flex-col border-1 shadow-md rounded-md w-[250px] px-2 py-3 hover:scale-110 transition duration-300 ease-out hover:ease-in hover:cursor-pointer ">
      <div>
        <img className="rounded-md items-center w-full" src={imgURL} />
        <p className="font-comfortaa items-start my-2 text-lg">{courseName}</p>
        <div className="my-3">
          <ul className="flex flex-row gap-1">
            {categories.map((category, index) => (
              <li className="text-[10px] border-1 border-[#DCDCDC] bg-[#DCDCDC] rounded-sm text-center px-2">
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <p className=" font-roboto-mono font-bold text-[20px]">₹{price}</p>
          <Button className="px-1 py-1 rounded-md" type="solid">
            Explore Course
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Card;
