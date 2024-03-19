import React from 'react'
import { useSelector } from 'react-redux'

const MyAppointments = () => {
    const user = useSelector(store=>store.user);
    console.log(user);
  return (
    <div>MyAppointments</div>
  )
}

export default MyAppointments