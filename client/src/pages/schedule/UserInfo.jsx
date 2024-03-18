import { Box } from '@mui/material'
import React from 'react'

const UserInfo = ({user}) => {

  return (
    <Box sx={{height:"10%",bgcolor:"#fff",pl:2,pt:1}}>
      {user}
    </Box>
  )
}

export default UserInfo