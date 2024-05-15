import React, { useEffect, useState } from "react";
import Button from "./Button";

const Card = ({ item, Index, AllMedicine }) => {
  // console.log(item?.salt_forms_json?.Tablet);

  const [formArr, setFormArr] = useState([]);
  const [stengthArr, setStengthArr] = useState([]);
  const [packing, setPacking] = useState([{}]);

  const [index, setIndex] = useState(0);
  const [strenindex, setStrenIndex] = useState(0);
  const [packindex, setPackIndex] = useState(0);

const [selectedFormIndex, setSelectedFormIndex] = useState(0);
const [selectedStrengthIndex, setSelectedStrengthIndex] = useState(0);
const [selectedPackingIndex, setSelectedPackingIndex] = useState(0);

  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const [showStrength, setShowStrength] = useState(false);

  const toggleShowStrength = () => {
    setShowStrength(!showStrength);
  };

  const [showPacking, setShowPacking] = useState(false);

  const toggleShowPacking = () => {
    setShowPacking(!showPacking);
  };

  const transformAndStore = () => {
    const transformedArray = item?.available_forms.map((element) => {
      return element;
    });
    setFormArr(transformedArray);
  };

  const transformAndStrength = () => {
    if (formArr.length > 0) {
      // console.log(formArr[index]);
      const transformedArray = Object.keys(
        item?.salt_forms_json?.[formArr[index]] || {}
      ).map((key) => {
        return { key, value: item?.salt_forms_json?.[formArr[index]][key] };
      });
      setStengthArr(transformedArray);
    } else {
      setStengthArr([]);
    }
  };

  const transformAndPacking = () => {
    
      // Added a check for stengthArr[0]?.key
      // console.log("problems with above");
      const formKey = formArr[index];
      const strengthKey = stengthArr[strenindex]?.key;
      if (formKey && strengthKey) {
        // console.log("problems with this");

        // console.log(item?.salt_forms_json?.[formKey]?.[strengthKey]);

        const transformedArray = Object.keys(
          item?.salt_forms_json?.[formKey]?.[strengthKey] || {}
        ).flatMap((key) => {
          const value = item?.salt_forms_json?.[formKey]?.[strengthKey]?.[key];
          if (value !== null || value !== undefined) {
            return [{ key: key || 'unknown', value }]; // Ensure 'key' is not undefined
          }else {
            return [];
          }
        });
        
        setPacking(transformedArray);
    
  };

}

  const TypeForm = (ind, val) => {
    console.log("Index :->", ind);
    setIndex(ind);
    // console.log(ind , val);
  };

  const TypeStrength = (ind, val) => {
    // console.log("Strength :", ind);
    setStrenIndex(ind);
  };

  const TypePack = (ind, val) => {
    // console.log("Packing :", ind);
    setPackIndex(ind);
  };

  useEffect(() => {
    transformAndStore();
  }, [item?.available_forms]);

  // console.log(stengthArr[0]);

  useEffect(() => {
    transformAndStrength();
  }, [formArr, index, strenindex, packindex]);

  useEffect(() => {
    if (
      item?.salt_forms_json?.[formArr[index]]?.[stengthArr[strenindex]?.key]
    ) {
      transformAndPacking();
    }
  }, [formArr, stengthArr, strenindex , packindex]);


  const findMinimumSellingPrice = (data) => {
    let minPrice = Infinity;
    // console.log(data);
    // data.forEach(item => {
    const keys = Object.keys(data[packindex].value);

    keys.forEach((key) => {
      // console.log(key);
      const prices = data[packindex].value[key];
      // console.log(prices);
      if (prices && Array.isArray(prices)) {
        prices.forEach((priceObj) => {
          if (
            priceObj &&
            priceObj.selling_price &&
            priceObj.selling_price < minPrice
          ) {
            minPrice = priceObj.selling_price;
          }
        });
      }
    });
    // });
    return minPrice;
  };

  // console.log(AllMedicine[Index]);

  let minSellingPrice = Infinity;

  {
    packing.length > 1 && (minSellingPrice = findMinimumSellingPrice(packing));
  }

  // console.log(stengthArr);

  const handleFormButtonClick = (index) => {
    setSelectedFormIndex(index);
  };
  
  const handleStrengthButtonClick = (index) => {
    setSelectedStrengthIndex(index);
  };
  
  const handlePackingButtonClick = (index) => {
    setSelectedPackingIndex(index);
  };

  return (
    <div className="p-10 flex  items-center justify-between mt-10  shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] max-w-screen-xl mx-auto">
      <div className="flex w-[40%] flex-col">
        <div className="mb-3 gap-3 flex ">
          <div className=" W-[15%]">
            <p className="text-xl font-semibold">Form:</p>
          </div>
          <div className="flex ml-12 flex-wrap gap-1 justify-stretch W-[85%] ">
            {(formArr || []).map((item, i) => (
              <Button
                key={i}
                i={i}
                show={showAll}
                length={formArr.length}
                item={item}
                Index={Index}
                TypeForm={TypeForm}
                minSellingPrice={minSellingPrice}
                selected={selectedFormIndex === i} // Check if current button is selected
                handleFormButtonClick={() => handleFormButtonClick(i)} // Handle button click
              />
            ))}
            {formArr.length > 4 && (
              <button className="font-bold" onClick={toggleShowAll} >
                {showAll ? "Hide" : "more..."}
              </button>
            )}
          </div>
        </div>

        <div className="gap-3 mb-3 flex">
          <div className=" W-[15%]">
            <p className="text-xl font-semibold">Stength:</p>
          </div>
          <div className="ml-6 flex gap-1 flex-wrap justify-stretch W-[85%]">
            {(stengthArr || []).map((strength, i) => (
              <Button
                key={i}
                i={i}
                show={showStrength}
                length={stengthArr.length}
                item={strength.key}
                TypeStrength={TypeStrength}
                minSellingPrice = {minSellingPrice}
                selected={selectedStrengthIndex === i} // Check if current button is selected
                handleFormButtonClick={() => handleStrengthButtonClick(i)} // Handle button click
              />
            ))}
            {stengthArr.length > 4 && (
              <button className="font-bold" onClick={toggleShowStrength}>
                {showStrength ? "Hide" : "more..."}
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <div className=" W-[15%]">
            <p className="mr-2 text-xl font-semibold">Packiging:</p>
          </div>
          <div className=" flex flex-wrap gap-1 justify-stretch W-[85%]">
            {(packing || [])?.map((pack, i) => (
              <Button
                key={i}
                i={i}
                show={showPacking}
                length={packing.length}
                item={pack.key}
                TypePack={TypePack}
                minSellingPrice={minSellingPrice}
                btnBorder = {minSellingPrice == "Infinity" ? "border-2 border-dashed border-blue" : "border-2 border-black"}
                selected={selectedPackingIndex === i} // Check if current button is selected
                handleFormButtonClick={() => handlePackingButtonClick(i)} // Handle button click
              />
            ))}
            {packing.length > 4 && (
              <button className="font-bold" onClick={toggleShowPacking}>
                {showPacking ? "Hide" : "more..."}
              </button>
            )}
           
          </div>
        </div>
      </div>

      <div className="w-[40%]">
        <h1 className="text-xl font-bold">Salt {(item.salt).substring(0,12)}</h1>
        {packing.length > 0 && stengthArr.length > 0 && (
          <p>
            {formArr[index]} |  {stengthArr[strenindex]?.key !== undefined &&  stengthArr[strenindex]?.key} | {packing[packindex]?.key !== undefined &&  packing[packindex]?.key}
          </p>
        )}
      </div>

      <div className="w-[20%]">
        {minSellingPrice != "Infinity" ? (
          <h1 className="text-[40px] font-extrabold">
            From₹{minSellingPrice}
          </h1>
        ) : (
          <div className="bg-zinc-100 p-6 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <p>No stores selling this product near you</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
