import React, { useEffect, useState, memo, useCallback } from "react";
import SearchPeople from "./SearchPeople";
import PeopleList from "./PeopleList";
import { Box, Stack } from "@mui/material";
import { Severity, defaultAsyncInfo } from "../../../constants/common";
import useAxios from "../../../hooks/useAxios";
import axiosPublic from "../../../config/axios";
import { ErrorHandler } from "../../../helpers/asyncHandler";
import useDebounce from "../../../hooks/useDebounce";
import Loading from "../../../components/common/Loading";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";
import { useSelector } from "react-redux";

const PeopleView = memo(() => {
  const [searchText, setSearchText] = useState("");
  const [people, setPeople] = useState([]);
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);

  const axios = useAxios(axiosPublic);
  const debouncedSearchText = useDebounce(searchText, 1000);
  const {user} = useSelector(store=>store.user);

  useEffect(() => {
    async function fetchUsers() {
      setAsyncInfo({
        ...defaultAsyncInfo,
        loading: true,
        message: "Fetching Users...",
      });
      try {
        const response = await axios.get("/api/users/search", {
          params: {
            name: debouncedSearchText,
          },
        });
        let peopleWithNames = response.data.map((user) => ({
          ...user,
          name: user.firstname + " " + user.lastname,
        }));

        if(user!=null && peopleWithNames.find(person=>person.userId===user.userId)?.userId){
          const {token,...loggedInUser}= user;
          peopleWithNames=peopleWithNames.filter(person=>person?.userId!==loggedInUser.userId);
          loggedInUser.name= loggedInUser.firstname +" "+ loggedInUser.lastname+ " (you)";
          peopleWithNames.unshift(loggedInUser);
        }

        setPeople(peopleWithNames);
        setAsyncInfo(defaultAsyncInfo);
      } catch (error) {
        const errObj = ErrorHandler(error);
        setAsyncInfo({
          ...defaultAsyncInfo,
          message: errObj.message,
          severity: Severity.ERROR,
        });
      }
    }
    fetchUsers();
  }, [axios, debouncedSearchText, user]);

  const handleChange = useCallback((e) => setSearchText(e.target.value), []);
  const onClose = useCallback(() => setAsyncInfo(defaultAsyncInfo), []);

  return (
    <>
      <ErrorSnackbar
        open={!!asyncInfo.severity}
        onClose={onClose}
        message={asyncInfo.message}
        severity={asyncInfo?.severity}
      />
      <Stack sx={{ overflow: "auto", height: "100%" }}>
        <SearchPeople searchText={searchText} handleChange={handleChange} />
        <Box sx={{ position: "relative", flexGrow: 1 }}>
          {asyncInfo.loading ? (
            <Loading text={asyncInfo.message} />
          ) : (
            <PeopleList people={people} />
          )}
        </Box>
      </Stack>
    </>
  );
});

PeopleView.displayName = PeopleView;

export default PeopleView;
