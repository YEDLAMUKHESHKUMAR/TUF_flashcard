import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="border-b-2 w-full  pr-6 pl-6 border-gray-600 text-white flex justify-between align-middle  h-16">
      {/* <div className="flex justify-between align-middle"> */}
      <Link to="/">
        <div className="pt-4">
          <button className="text-[#e11d48] border-[#e11d48] border pr-3 pl-3 pt-1 pb-2">
            Home
          </button>
        </div>
      </Link>
      <Link to="/admin">
        <div className="pt-4">
          <button className="bg-[#e11d48]  pr-4 pl-4 pt-1 rounded-md pb-2 text-center">
            Admin
          </button>
        </div>
      </Link>
      {/* </div> */}
    </div>
  );
};

export default Header;
