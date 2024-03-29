import React, { memo } from "react";
import CustomTextField from "../../../components/common/CustomTextField";

const styles = {
  searchText: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: "grey.100",
  },
};

const SearchPeople = memo(({ searchText, handleChange }) => {
  return (
    <>
      <CustomTextField
        placeHolder="Search a people"
        type="text"
        name="searchText"
        value={searchText}
        onChange={handleChange}
        required={false}
        autoComplete="off"
        variant="standard"
        style={styles.searchText}
      />
    </>
  );
});

SearchPeople.displayName = "SearchPeople";

export default SearchPeople;
