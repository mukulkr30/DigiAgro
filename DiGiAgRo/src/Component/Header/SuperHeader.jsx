import React from 'react'
import './SuperHeader.css'
import Logo from './Logo'
import SearchBar from './SearchBar'
import ProfileIcon from './ProfileIcon'
import LanguageDropdown from './LanguageDropdown'

function SuperHeader({ onLanguageChange }) {
  return (
    <div className="super-header">
      <Logo />

      <div className="right-section">
        <LanguageDropdown onLanguageChange={onLanguageChange}/>
        <SearchBar />
        <ProfileIcon />
      </div>
    </div>
  )
}

export default SuperHeader
