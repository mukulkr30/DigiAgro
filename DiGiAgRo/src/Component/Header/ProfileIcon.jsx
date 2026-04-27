import React from 'react'
import './SuperHeader.css'
import { NavLink } from 'react-router-dom'

function ProfileIcon() {
  return (
    <NavLink className="profile-icon">
      👤
    </NavLink>
  )
}

export default ProfileIcon
