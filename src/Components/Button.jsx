import React, { useState , useEffect } from "react";

const Button = ({
  item,
  show,
  i,
  Index,
  TypeForm ,
  TypeStrength ,
  TypePack ,
  selected,
  handleFormButtonClick,
  minSellingPrice
}) => {

  // console.log("Selected->" , selected);

  return (
    <div>
      <button
        onClick={() => {
          handleFormButtonClick(i)
          typeof TypeForm === "function"
            ? TypeForm(i, Index)
            : typeof TypeStrength === "function"
            ? TypeStrength(i, Index)
            : typeof TypePack === "function" && TypePack(i, Index);
        }}
        style={{
          display: show || i < 4 ? "inline-block" : "none",
          border: selected ? "2px solid black" : "2px solid #C7C8CC",
          boxShadow: selected ? "0 4px 4px rgba(8, 112, 184, 0.7)" : "none",
          borderStyle: selected ? `${minSellingPrice === Infinity ? `dashed` : `solid`}` : null
        }}
        className={`rounded-lg font-bold   py-2 px-2`}
        key={i}
      >
        {item}
      </button>
    </div>
  );
};

export default Button;
