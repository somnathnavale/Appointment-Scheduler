import React, { useEffect, useState, memo } from "react";
import SearchPeople from "./SearchPeople";
import PeopleList from "./PeopleList";
import { Box } from "@mui/material";
import { STATUS, defaultAsyncInfo } from "../../../constants/common";
import useAxios from "../../../hooks/useAxios";
import axiosPublic from "../../../config/axios";
import { ErrorHandler } from "../../../helpers/asyncHandler";

const PeopleView = memo(() => {
  const [searchText, setSearchText] = useState("");
  const [people, setPeople] = useState([]);
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);

  const axios = useAxios(axiosPublic);

  useEffect(() => {
    async function fetchUsers() {
      setAsyncInfo((prev) => ({
        ...prev,
        loadingStatus: true,
        loadingMessage: "Fetching Users",
      }));
      try {
        const response = await axios.get("/api/users/");
        const peopleWithNames = response.data.map((user) => ({
          ...user,
          name: user.firstname + " " + user.lastname,
        }));
        setPeople(peopleWithNames);
        setAsyncInfo({
          ...defaultAsyncInfo,
          loadingStatus: false,
          loadingMessage: "",
        });
      } catch (error) {
        const errObj = ErrorHandler(error);
        setAsyncInfo((prev) => ({
          ...prev,
          loadingStatus: false,
          loadingMessage: "",
          message: errObj.message,
          status: STATUS.ERROR,
        }));
      }
    }
    fetchUsers();
  }, [axios]);

  // useEffect(()=>{
  //   const filteredPeople = peopleList.filter(person=>{
  //     return (
  //       person.name.toLowerCase().includes(searchText.toLowerCase())
  //     )
  //   })
  //   setPeople(filteredPeople);
  // },[searchText])

  return (
    <Box sx={{ overflow: "auto" }}>
      <SearchPeople searchText={searchText} setSearchText={setSearchText} />
      <PeopleList people={people} />
    </Box>
  );
});

PeopleView.displayName = PeopleView;

export default PeopleView;
