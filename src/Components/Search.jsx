import React, { useEffect, useState } from "react";
import Card from "./Card";
import Button from "./Button";

const Search = () => {
  const [AllMedicine, setAllMedicine] = useState([]);
  const [formArr, setFormArr] = useState([]);
  const [stengthArr, setStengthArr] = useState([]);
  const [packing, setPacking] = useState([]);

  const [serachInput, setSerachInput] = useState(""); // To create state variable

  function FindMedicine(input) {
    getMedicineDetails(input);
  }

  async function getMedicineDetails(input) {
    const data = await fetch(
      `https://backend.cappsule.co.in/api/v1/new_search?q=${input}&pharmacyIds=1,2,3`
    );
    const jsonData = await data.json();
    // console.log(jsonData?.data?.saltSuggestions[0]);
    setAllMedicine(jsonData?.data?.saltSuggestions);
    setSerachInput("");
  }

  return (
    <div className="max-w-screen-xl  h-full">
      <h1 className="text-6xl font-bold mb-10">Capssule</h1>

      <div>
        <div className="relative ">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            // style={{padding: "10px"}}
            type="text"
            className="block w-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] p-4 ps-10 text-xl  border border-gray-300 rounded-full bg-gray-50 "
            placeholder="Search"
            value={serachInput}
            onChange={(e) => {
              setSerachInput(e.target.value);
            }}
          />
          <button
            className="absolute end-2 bottom-[6px] text-xl focus:outline-none font-medium rounded-lg  px-4 py-2 text-black " // style={{backgroundColor: "green" , padding: "10px"}}
            onClick={() => FindMedicine(serachInput)}
          >
            Search
          </button>
        </div>
      </div>

      <div className="w-full mt-10 bg-white h-[0.2px]"></div>

      {AllMedicine.length > 0 ? (
        <>
          {AllMedicine.map((item, i) => (
            <Card AllMedicine={AllMedicine} item={item} Index={i} key={i} />
          ))}
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-500  mt-96">
            " Find Medicines with amazing discount "
          </h1>
        </>
      )}
    </div>
  );
};

export default Search;
