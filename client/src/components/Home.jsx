import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <div>
      <div className="text-center text-white text-[48px] mt-6 mb-6">
        Striver OOPS sheet
      </div>
      <div className="bg-[rgba(217,205,205,0.178)] p-4 rounded-md ml-6 mr-6 border border-white  text-white ">
        <div
          onClick={handleClick}
          className="cursor-pointer flex justify-between h-[full]"
        >
          <div>1. Oops basics</div>
          {clicked === true ? (
            <div className="text-lg"> ^ </div>
          ) : (
            <div className="text-md mr-1"> v </div>
          )}
        </div>
        {clicked === false ? (
          ""
        ) : (
          <div>
            <Link to="/quiz">
              <div className="p-4 mt-2  ml-6 rounded-lg mr-6 bg-[rgba(243,222,222,0.23)]  ">
                L-1 : Take Quiz
              </div>
            </Link>
            <div className="p-4 mt-2  ml-6 rounded-lg mr-6 bg-[rgba(243,222,222,0.23)]  ">
              L-2 : Coming soon....
            </div>
          </div>
        )}
      </div>
      <div className="bg-[rgba(217,205,205,0.178)] mt-4 p-4 rounded-md ml-6 mr-6 border border-white  text-white ">
        coming soon......
      </div>
    </div>
  );
};

export default Home;
