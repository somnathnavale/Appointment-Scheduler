import React from "react";
import CustomTextField from "../../../components/common/CustomTextField";

const SearchPeople = ({ searchText, setSearchText }) => {
  return (
    <>
      <CustomTextField
        placeHolder="Search a people"
        type="text"
        name="searchText"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        required={false}
        autoComplete="off"
        variant="standard"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "grey.100",
        }}
      />
    </>
  );
};

export default SearchPeople;
