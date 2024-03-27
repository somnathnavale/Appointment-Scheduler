import React, { useEffect, useState, memo } from "react";
import SearchPeople from "./SearchPeople";
import PeopleList from "./PeopleList";
import { Box, Stack } from "@mui/material";
import { STATUS, defaultAsyncInfo } from "../../../constants/common";
import useAxios from "../../../hooks/useAxios";
import axiosPublic from "../../../config/axios";
import { ErrorHandler } from "../../../helpers/asyncHandler";
import useDebounce from "../../../hooks/useDebounce";
import Loading from "../../../components/common/Loading";

const PeopleView = memo(() => {
  const [searchText, setSearchText] = useState("");
  const [people, setPeople] = useState([]);
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);

  const axios = useAxios(axiosPublic);
  const debouncedSearchText = useDebounce(searchText, 1000);

  useEffect(() => {
    async function fetchUsers() {
      setAsyncInfo((prev) => ({
        ...prev,
        loadingStatus: true,
        loadingMessage: "Fetching Users",
      }));
      try {
        const response = await axios.get("/api/users/search", {
          params: {
            name: debouncedSearchText,
          },
        });
        const peopleWithNames = response.data.map((user) => ({
          ...user,
          name: user.firstname + " " + user.lastname,
        }));
        setPeople(peopleWithNames);
        setAsyncInfo({
          ...defaultAsyncInfo,
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
  }, [axios, debouncedSearchText]);

  return (
    <Stack sx={{ overflow: "auto", height: "100%" }}>
      <SearchPeople searchText={searchText} setSearchText={setSearchText} />
      <Box sx={{ position: "relative", flexGrow: 1 }}>
        {asyncInfo.loadingStatus ? (
          <Loading text={asyncInfo.loadingMessage} />
        ) : (
          <PeopleList people={people} />
        )}
      </Box>
    </Stack>
  );
});

PeopleView.displayName = PeopleView;

export default PeopleView;
