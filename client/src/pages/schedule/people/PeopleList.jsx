import React, { memo } from "react";
import { Box, List, ListItem, ListItemText, alpha } from "@mui/material";
import { setPageView, setSelectedUser } from "../../../features/schedule/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "../../../constants/common";

const PeopleList = memo(({ people }) => {
  const { selectedUser } = useSelector((store) => store.schedule);

  const dispatch = useDispatch();

  const handleUserSelect = (person) => {
    dispatch(setPageView(Page.CALENDER))
    dispatch(setSelectedUser(person));
  };

  return (
    <Box>
      <List sx={{ pt: 0 }}>
        {people.map((person) => (
          <ListItem
            key={person.userId}
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid red",
              borderColor: "grey.400",
              alignItems: "flex-start",
              color: "grey.700",
              ":hover": {
                bgcolor:
                  selectedUser?.userId === person?.userId
                    ? (theme) => alpha(theme.palette.grey[400], 0.8)
                    : (theme) => alpha(theme.palette.grey[300], 0.6),
              },
              bgcolor:
                selectedUser?.userId === person?.userId ? "grey.300" : "grey.200",
            }}
            onClick={() => handleUserSelect(person)}
          >
            <ListItemText sx={{ m: 0 }}>{person.name}</ListItemText>
            <ListItemText sx={{ fontSize: "14px", color: "grey.500", m: 0 }}>
              {person.email}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
});

PeopleList.displayName = PeopleList;

export default PeopleList;
