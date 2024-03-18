import React,{memo} from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { setSelectedUser } from "../../../features/schedule/scheduleSlice";
import {useDispatch} from "react-redux";

const PeopleList = memo(({ people }) => {

  const dispatch=useDispatch();
  console.log(people);
  const handleUserSelect=(id)=>{
    dispatch(setSelectedUser(id));  
  }

  return (
    <Box>
      <List sx={{pt:0}}>
        {people.map((person) => (
          <ListItem
            key={person.id}
            sx={{
              cursor:"pointer",
              display: "flex",
              flexDirection: "column",
              borderBottom: "1px solid red",
              borderColor:'grey.400',
              alignItems: "flex-start",
              color:"grey.700",
              ":hover":{
                bgcolor:"grey.300",
              }
            }}
            onClick={()=>handleUserSelect(person.id)}
          >
            <ListItemText sx={{m:0}}>{person.name}</ListItemText>
            <ListItemText sx={{ fontSize: "14px", color: "#b6b6b2", m:0 }}>
              {person.email}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
});

PeopleList.displayName=PeopleList;

export default PeopleList;
