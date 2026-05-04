import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ProfileIcon from "./ProfileIcon";
import LanguageDropdown from "./LanguageDropdown";

function SuperHeader({ onLanguageChange,token, setToken}) {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-green-800 text-white shadow-md">
      
      {/* Left */}
      <Logo />

      {/* Center */}
      <div className="flex-1 flex justify-center px-4">
        <SearchBar />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* <LanguageDropdown onLanguageChange={onLanguageChange} /> */}
        <ProfileIcon token={token} setToken={setToken} />
      </div>

    </header>
  );
}

export default SuperHeader;