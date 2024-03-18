import React, { useEffect, useState,memo } from 'react'
import SearchPeople from './SearchPeople'
import PeopleList from './PeopleList'
import { Box } from '@mui/material'

const peopleList=[
  {name: "John Doe", id: "JD001", email: "john.doe@example.com"},
  {name: "Jane Smith", id: "JS002", email: "jane.smith@example.com"},
  {name: "Alice Johnson", id: "AJ003", email: "alice.johnson@example.com"},
  {name: "Bob Williams", id: "BW004", email: "bob.williams@example.com"},
  {name: "Emily Brown", id: "EB005", email: "emily.brown@example.com"},
  {name: "Michael Davis", id: "MD006", email: "michael.davis@example.com"},
  {name: "Sarah Wilson", id: "SW007", email: "sarah.wilson@example.com"},
  {name: "David Martinez", id: "DM008", email: "david.martinez@example.com"},
  {name: "Olivia Taylor", id: "OT009", email: "olivia.taylor@example.com"},
  {name: "James Anderson", id: "JA010", email: "james.anderson@example.com"},
  {name: "Emma Garcia", id: "EG011", email: "emma.garcia@example.com"},
  {name: "Daniel Hernandez", id: "DH012", email: "daniel.hernandez@example.com"},
  {name: "Sophia Martinez", id: "SM013", email: "sophia.martinez@example.com"},
  {name: "Matthew Lopez", id: "ML014", email: "matthew.lopez@example.com"},
  {name: "Isabella Gonzalez", id: "IG015", email: "isabella.gonzalez@example.com"},
  {name: "William Perez", id: "WP016", email: "william.perez@example.com"},
  {name: "Mia Sanchez", id: "MS017", email: "mia.sanchez@example.com"},
  {name: "Alexander Ramirez", id: "AR018", email: "alexander.ramirez@example.com"},
  {name: "Charlotte Torres", id: "CT019", email: "charlotte.torres@example.com"},
  {name: "Ethan Flores", id: "EF020", email: "ethan.flores@example.com"},
  {name: "Amelia Cruz", id: "AC021", email: "amelia.cruz@example.com"},
  {name: "Michael Phillips", id: "MP022", email: "michael.phillips@example.com"},
  {name: "Madison Russell", id: "MR023", email: "madison.russell@example.com"},
  {name: "Henry Long", id: "HL024", email: "henry.long@example.com"},
  {name: "Ava Griffin", id: "AG025", email: "ava.griffin@example.com"},
  {name: "Benjamin Reed", id: "BR026", email: "benjamin.reed@example.com"},
  {name: "Chloe Young", id: "CY027", email: "chloe.young@example.com"},
  {name: "Jacob Butler", id: "JB028", email: "jacob.butler@example.com"},
  {name: "Samantha Scott", id: "SS029", email: "samantha.scott@example.com"},
  {name: "Liam Nguyen", id: "LN030", email: "liam.nguyen@example.com"}
]

const PeopleView = memo(() => {
  const [searchText,setSearchText]= useState("");
  const [people,setPeople]= useState(peopleList);

  useEffect(()=>{
    const filteredPeople = peopleList.filter(person=>{
      return (
        person.name.toLowerCase().includes(searchText.toLowerCase())
      )
    }) 
    setPeople(filteredPeople); 
  },[searchText])
  
  return (
    <Box style={{maxHeight:'calc(100vh - 130px - 20px)',overflow:"auto"}}>
      <SearchPeople searchText={searchText} setSearchText={setSearchText}/>
      <PeopleList people={people}/>
    </Box>
  )
})

PeopleView.displayName=PeopleView;

export default PeopleView