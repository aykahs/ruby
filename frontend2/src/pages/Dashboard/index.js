import React from 'react'
import  useSession  from '../../Hooks/useSession'


const Dashboard = () => {
    const {  user } = useSession()

  return (
    <div>
    <h2>Dashboard,{user?.name}</h2>
    </div>
  )
}

export default Dashboard
